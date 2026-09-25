'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  Map as MapIcon,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  chapters,
  getCard,
  glossary,
  sourceUrl,
  cardKindLabel,
} from '@/lib/knowledge';
import {
  LatestUpdateNotice,
  ClientDirectionVisual,
  DataReadinessVisual,
} from './client-updates';
import { lessons } from '@/lib/learning-path';
import type { Scenario } from './wireframes';
import {
  EssentialsStack,
  ProductOverview,
  ReportTimeline,
} from './exploration-widgets';

type Props = {
  active: string;
  completed: string[];
  onNavigate: (id: string) => void;
  onComplete: (id: string, answer: string) => void;
  onCanvas: () => void;
  onWireframe: (scenario: Scenario) => void;
  onEmail: (quiet: boolean) => void;
  onChecklist: () => void;
};

export function LearningPath(props: Props) {
  return <LessonPage key={props.active} {...props} />;
}

function LessonPage({
  active,
  completed,
  onNavigate,
  onComplete,
  onCanvas,
  onWireframe,
  onEmail,
  onChecklist,
}: Props) {
  const index = lessons.findIndex((lesson) => lesson.id === active);
  const lesson = lessons[index];
  const title = useRef<HTMLHeadingElement>(null);
  const [attempt, setAttempt] = useState<{
    answer: number;
    submitted: boolean;
  } | null>(null);
  const answer = attempt
    ? attempt.answer
    : completed.includes(active)
      ? lesson.quiz.correct
      : null;
  const submitted = attempt ? attempt.submitted : completed.includes(active);
  const correct = submitted && answer === lesson.quiz.correct;
  const remaining = lessons.filter((item) => !completed.includes(item.id));
  const sources = [
    ...new Map(
      lesson.details
        .flatMap((id) => getCard(id).sources)
        .map((source) => [sourceUrl(source), source]),
    ).values(),
  ];

  useEffect(() => {
    title.current?.focus({ preventScroll: true });
  }, []);

  function checkAnswer(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (answer === null) return;
    setAttempt({ answer, submitted: true });
    if (answer === lesson.quiz.correct)
      onComplete(active, lesson.quiz.options[answer]);
  }

  return (
    <article
      className="lesson-page"
      data-chapter={active}
      aria-labelledby="lesson-title"
    >
      <div className="lesson-location">
        <span>LEARN EXIT RADAR</span>
        <span>
          Chapter {index + 1} of {lessons.length}
        </span>
      </div>
      <div className="lesson-steps" aria-label="Learning path">
        {chapters.map((chapter, i) => (
          <button
            key={chapter.id}
            data-chapter={chapter.id}
            aria-current={chapter.id === active ? 'step' : undefined}
            aria-label={`${i + 1}. ${chapter.title}${completed.includes(chapter.id) ? ' — knowledge check passed' : ''}`}
            title={chapter.title}
            className={`${i === index ? 'current' : ''} ${completed.includes(chapter.id) ? 'complete' : ''}`}
            onClick={() => onNavigate(chapter.id)}
          >
            {completed.includes(chapter.id) ? <Check size={14} /> : i + 1}
          </button>
        ))}
      </div>

      {index === 0 && (
        <LatestUpdateNotice onOpen={() => onNavigate('updates')} />
      )}
      <header className="lesson-heading">
        <p>{chapters[index].title}</p>
        <h2 ref={title} tabIndex={-1} id="lesson-title">
          {lesson.question}
        </h2>
        <p className="lesson-answer">{lesson.answer}</p>
      </header>
      {index === 0 && (
        <p className="lesson-orientation">
          <BookOpen size={18} aria-hidden="true" />
          Follow eight foundational chapters, then explore design direction and
          report data. Jump to any topic in the navigation. Each ends with one
          optional knowledge check. Use Canvas to see the connections.
        </p>
      )}

      <section className="lesson-story" aria-labelledby="story-title">
        <div className="lesson-story-label">
          {lesson.storyLabel || 'ONE CONTINUING EXAMPLE'}{' '}
          <span>{lesson.storyNote || 'Fictional company & data'}</span>
        </div>
        <h3 id="story-title">{lesson.story.title}</h3>
        <p>{lesson.story.text}</p>
        <LessonVisual id={active} onWireframe={onWireframe} onEmail={onEmail} />
      </section>

      <EssentialsStack items={lesson.essentials} />

      {lesson.terms.length > 0 && (
        <aside className="lesson-terms" aria-label="Terms used in this chapter">
          <h3>Terms, in plain English</h3>
          <dl>
            {lesson.terms.map((term) => {
              const entry = glossary.find(([name]) => name === term)!;
              return (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{entry[1]}</dd>
                </div>
              );
            })}
          </dl>
        </aside>
      )}

      <form className="lesson-quiz" onSubmit={checkAnswer}>
        <div className="lesson-quiz-label">
          <span>CHECK YOUR UNDERSTANDING</span>
          <span>
            {completed.includes(active) ? (
              <>
                <Check size={15} /> Passed
              </>
            ) : (
              'Optional · one question'
            )}
          </span>
        </div>
        <fieldset>
          <legend>{lesson.quiz.question}</legend>
          <div className="lesson-options">
            {lesson.quiz.options.map((option, i) => (
              <label key={option} className={answer === i ? 'selected' : ''}>
                <input
                  type="radio"
                  name={`answer-${active}`}
                  value={i}
                  checked={answer === i}
                  onChange={() => {
                    setAttempt({ answer: i, submitted: false });
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <Button
          type="submit"
          variant="outline"
          disabled={answer === null || submitted}
        >
          {submitted
            ? correct
              ? 'Answer checked'
              : 'Choose another answer to retry'
            : 'Check answer'}
          {correct && <Check size={16} />}
        </Button>
        <div aria-live="polite" aria-atomic="true">
          {submitted && (
            <div className={`lesson-feedback ${correct ? 'correct' : ''}`}>
              <strong>
                {correct ? 'That’s right.' : 'Not quite. Try again.'}
              </strong>
              <p>{lesson.quiz.explanation}</p>
            </div>
          )}
        </div>
      </form>

      <details className="lesson-deeper">
        <summary>
          <span>
            <FileText size={18} />
            Details & source references
          </span>
          <ChevronDown size={18} />
        </summary>
        <p className="lesson-detail-intro">
          The main lesson is above. Expand a topic below when you need the full
          requirement or design context.
        </p>
        {lesson.details.map((id) => {
          const card = getCard(id);
          return (
            <details className="lesson-reference" key={id}>
              <summary>
                <span>
                  {card.title}
                  <small>{cardKindLabel(card.kind)}</small>
                </span>
                <ChevronDown size={16} />
              </summary>
              <div>
                {card.points.map((point) => (
                  <p key={point}>{point}</p>
                ))}
                <div className="lesson-source-links">
                  {card.sources.map((source, i) => (
                    <a
                      key={i}
                      href={sourceUrl(source)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.label}
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
        {active === 'scope' && (
          <Button variant="outline" onClick={onChecklist}>
            Review the 10 acceptance criteria
            <ArrowUpRight size={16} />
          </Button>
        )}
      </details>

      {index === lessons.length - 1 && (
        <section className="lesson-wrapup">
          <span className="lesson-eyebrow">YOU’VE REACHED THE END</span>
          <h3>Can you connect the product and the latest direction?</h3>
          <p>
            Explain the report and its monthly loop, then distinguish the latest
            design direction, dated implementation evidence, and the questions
            that still need examples or clarification.
          </p>
          <p>
            {completed.length} of {lessons.length} knowledge checks passed.{' '}
            {remaining.length
              ? 'Revisit any unanswered chapter whenever you want.'
              : 'All checks passed. Use the canvas or source references for deeper review.'}
          </p>
          <div>
            {remaining.length > 0 && (
              <Button
                variant="outline"
                onClick={() => onNavigate(remaining[0].id)}
              >
                <RotateCcw size={16} />
                Review chapter {lessons.indexOf(remaining[0]) + 1}
              </Button>
            )}
            <Button variant="outline" onClick={onCanvas}>
              <MapIcon size={16} />
              Explore the connected canvas
            </Button>
          </div>
        </section>
      )}

      <nav className="lesson-footer" aria-label="Chapter navigation">
        <Button
          variant="ghost"
          disabled={index === 0}
          onClick={() => onNavigate(lessons[index - 1].id)}
        >
          <ArrowLeft size={16} />
          Previous
        </Button>
        {index < lessons.length - 1 ? (
          <Button onClick={() => onNavigate(lessons[index + 1].id)}>
            <span>
              <small>Next chapter</small>
              {chapters[index + 1].title}
            </span>
            <ArrowRight size={18} />
          </Button>
        ) : (
          <Button onClick={() => onNavigate('overview')}>
            Back to the beginning
            <ArrowRight size={18} />
          </Button>
        )}
      </nav>
      <p className="lesson-citations">
        Based on{' '}
        {sources.map((source, i) => (
          <span key={sourceUrl(source)}>
            {i > 0 && ' · '}
            <a href={sourceUrl(source)} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          </span>
        ))}
      </p>
    </article>
  );
}

function LessonVisual({
  id,
  onWireframe,
  onEmail,
}: {
  id: string;
  onWireframe: Props['onWireframe'];
  onEmail: Props['onEmail'];
}) {
  if (id === 'updates') return <ClientDirectionVisual />;
  if (id === 'readiness') return <DataReadinessVisual />;
  if (id === 'overview') return <ProductOverview onWireframe={onWireframe} />;
  if (id === 'journey' || id === 'delivery')
    return (
      <ReportTimeline
        variant={id === 'journey' ? 'journey' : 'refresh'}
        onWireframe={onWireframe}
        onEmail={onEmail}
      />
    );
  if (id === 'scope')
    return (
      <ol className="lesson-flow">
        {['Prepare', 'Explore & Watch', 'Refresh & return'].map(
          (step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
              {index < 2 && <ArrowRight size={18} aria-hidden="true" />}
            </li>
          ),
        )}
      </ol>
    );
  if (id === 'people')
    return (
      <div className="lesson-personas">
        <div>
          <span>STRATEGIC COMPANY</span>
          <strong>ExampleCo → ExampleCo’s report</strong>
          <p>Alex’s view throughout this learning path.</p>
        </div>
        <div>
          <span>INVESTMENT FIRM</span>
          <strong>Example Fund → A portfolio company’s report</strong>
          <p>Same structure. A different company is the subject.</p>
        </div>
      </div>
    );
  if (id === 'report')
    return (
      <>
        <ol className="lesson-report-map">
          {[
            [
              'Header',
              'ExampleCo · Last 24 months · Next update Sep 1 · Watch',
            ],
            ['Three statistics', '12 deals · 67% strategic · 17% PE'],
            ['Buyer cards', 'Northstar Group · 5 deals · Largest value n/d'],
            ['Transaction table', '2 sourced rows · Most recent first'],
            ['Changes after refresh', 'No change summary on this first report'],
          ].map(([label, value], i) => (
            <li key={label}>
              <span>{i + 1}</span>
              <div>
                <strong>{label}</strong>
                <p>{value}</p>
              </div>
            </li>
          ))}
        </ol>
        <Button onClick={() => onWireframe('sparse')}>
          Open this report and try Watch
          <ArrowUpRight size={16} />
        </Button>
      </>
    );
  if (id === 'rules')
    return (
      <figure className="lesson-corpus">
        <div className="lesson-corpus-groups">
          {[
            ['8', 'Strategic deals', '67% of all 12'],
            ['2', 'PE deals', '17% of all 12'],
            ['2', 'Unclassified deals', 'Included in the denominator'],
          ].map(([number, label, note]) => (
            <div key={label}>
              <strong>{number}</strong>
              <span>{label}</span>
              <small>{note}</small>
            </div>
          ))}
        </div>
        <figcaption>
          12 deals in the full corpus. Only 2 sourced transactions in the
          example table. Percentages are rounded.
        </figcaption>
        <Button variant="outline" onClick={() => onWireframe('fallback')}>
          Compare a five-year report
          <ArrowUpRight size={16} />
        </Button>
      </figure>
    );
  if (id === 'states')
    return (
      <div className="lesson-state-grid">
        {[
          ['sparse', 'Sparse report', 'Ready, with limited evidence'],
          ['loading', 'Loading', 'Fetching the report'],
          ['preparing', 'Being prepared', 'No generated report yet'],
          ['fallback', 'Five-year window', 'Wider initial reporting window'],
          ['quiet', 'Quiet month', 'A refresh with nothing new'],
          ['dense', 'Dense report', 'A separate example of the ceiling'],
          ['history', 'Previous edition', 'Proposed: browse history and return to latest'],
        ].map(([scenario, label, note]) => (
          <button
            key={scenario}
            onClick={() => onWireframe(scenario as Scenario)}
          >
            <span>
              <strong>{label}</strong>
              <small>{note}</small>
            </span>
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
    );
  return null;
}
