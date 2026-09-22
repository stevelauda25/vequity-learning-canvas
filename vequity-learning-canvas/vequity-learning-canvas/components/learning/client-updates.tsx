'use client';

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  LayoutGrid,
  FileText,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReportArtifactViewer } from './report-artifact-viewer';
import { cardKindLabel, getCard, type Card } from '@/lib/knowledge';
import {
  explorationDirections,
  readiness,
  updateResources,
  updateSources,
} from '@/lib/client-updates';

export function LatestUpdateNotice({ onOpen }: { onOpen: () => void }) {
  return (
    <aside
      className="latest-update-notice"
      aria-label="Design and report references"
    >
      <BookOpen size={20} aria-hidden="true" />
      <div>
        <strong>Explore the design references</strong>
        <p>
          Connect the design direction, example report, and JSON data in the
          final two chapters.
        </p>
      </div>
      <Button variant="outline" onClick={onOpen}>
        Explore references <ArrowRight size={16} />
      </Button>
    </aside>
  );
}

export function ClientDirectionVisual({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className="client-update-visual">
      <ul className="update-principles" aria-label="Client’s design goals">
        <li>
          <strong>Easy to scan</strong>
          <p>Help readers find the main facts quickly.</p>
        </li>
        <li>
          <strong>Insightful</strong>
          <p>Connect buyers and transactions to useful context.</p>
        </li>
        <li>
          <strong>Interesting</strong>
          <p>Make new activity and meaningful differences visible.</p>
        </li>
      </ul>
      <section
        className="update-directions"
        aria-label="Requested exploration directions"
      >
        <div className="update-section-label">
          <LayoutGrid size={16} />
          <span>Three requested exploration directions</span>
        </div>
        <div className="update-direction-grid">
          {explorationDirections.map((direction) => (
            <article key={direction.name}>
              <h4>{direction.name}</h4>
              <p>{direction.question}</p>
              {!compact && <small>{direction.detail}</small>}
            </article>
          ))}
        </div>
      </section>
      {!compact && (
        <>
          <details className="update-disclosure">
            <summary>Which reference answers which question?</summary>
            <dl className="update-definition-list">
              <div>
                <dt>PRD & Design Starter</dt>
                <dd>Required product behavior, evidence rules, and scope.</dd>
              </div>
              <div>
                <dt>Paper</dt>
                <dd>
                  Existing theme, navigation, tokens, and Intelligence patterns.
                  Shared by the client; the file has not been inspected here.
                </dd>
              </div>
              <div>
                <dt>JSON & HTML</dt>
                <dd>
                  A dated data description and an example report. The fictional
                  JSON and VanZandt HTML are different examples.
                </dd>
              </div>
              <div>
                <dt>Scout video</dt>
                <dd>
                  Inspiration for summaries, relevance, and detail. Its chat and
                  integrations do not expand v1.
                </dd>
              </div>
            </dl>
          </details>
          <details className="update-disclosure">
            <summary>
              Watch the Scout reference and connect it to Exit Radar
            </summary>
            <p className="update-caption">
              Reference demo · approximately 2:23 · original burned-in
              subtitles.
            </p>
            <div className="update-source-actions">
              <a
                href={updateSources.video.url}
                target="_blank"
                rel="noreferrer"
              >
                <Play size={16} /> Open the captioned reference video
              </a>
            </div>
            <ol className="update-video-notes">
              <li>
                <a
                  href={`${updateSources.video.url}#t=5`}
                  target="_blank"
                  rel="noreferrer"
                >
                  00:05–00:20 <Play size={12} />
                </a>
                <span>
                  Purpose, schedule, and a short summary of new matches.
                </span>
              </li>
              <li>
                <a
                  href={`${updateSources.video.url}#t=25`}
                  target="_blank"
                  rel="noreferrer"
                >
                  00:25 <Play size={12} />
                </a>
                <span>
                  Company facts followed by why the result fits and why timing
                  matters.
                </span>
              </li>
              <li>
                <a
                  href={`${updateSources.video.url}#t=70`}
                  target="_blank"
                  rel="noreferrer"
                >
                  01:10 <Play size={12} />
                </a>
                <span>
                  Meaningful groups explain which opportunities were missed.
                </span>
              </li>
              <li>
                <a
                  href={`${updateSources.video.url}#t=130`}
                  target="_blank"
                  rel="noreferrer"
                >
                  02:10 <Play size={12} />
                </a>
                <span>
                  Conversational preferences are reference behavior, outside the
                  current v1 brief.
                </span>
              </li>
            </ol>
            <p className="update-caption">
              Design interpretation: changes → relevant buyers and deals →
              evidence. Keep the product’s actual theme grounded in Paper.
            </p>
          </details>
        </>
      )}
    </div>
  );
}

export function DataReadinessVisual({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className="client-update-visual">
      <ReportArtifactViewer />
      <dl
        className="update-evidence-stats"
        aria-label="Observations from the supplied HTML"
      >
        {[
          ['45', 'Deals in the report corpus'],
          ['20', 'Displayed sourced transactions'],
          ['19 / 20', 'Displayed rows without a value'],
          ['5 / 20', 'Displayed rows without a reason'],
        ].map(([value, label]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className="update-caption">
        Supplied artifact, generated 21 Sep 2026 · six buyer cards, one without
        a thesis · these are observations, not live metrics.
      </p>
      <div className="update-source-actions">
        <a href={updateSources.report.url} target="_blank" rel="noreferrer">
          Inspect the HTML <ArrowUpRight size={14} />
        </a>
        <a href={updateSources.schema.url} target="_blank" rel="noreferrer">
          Read the JSON guide <ArrowUpRight size={14} />
        </a>
      </div>
      <details className="update-disclosure" open={compact ? true : undefined}>
        <summary>Implementation readiness · snapshot of 21 Sep 2026</summary>
        <p className="update-caption">
          These are statements in the supplied note. Current branch and API
          status have not been verified here.
        </p>
        <dl className="update-readiness-list">
          {readiness.map((item) => (
            <div key={item.feature}>
              <dt>
                {item.feature}
                <span>{item.status}</span>
              </dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>
      </details>
      {!compact && (
        <details className="update-disclosure">
          <summary>What to collect before finalizing exploration</summary>
          <ul className="update-followups">
            <li>The Paper link, to inspect the existing visual foundation.</li>
            <li>
              Two consecutive reports for the same company, with their changes.
            </li>
            <li>
              Populated capability overlap and an actual JSON payload for the
              supplied report.
            </li>
            <li>
              Confirmation of quoted versus summarized reasons, missing-field
              presentation, and API readiness.
            </li>
          </ul>
        </details>
      )}
    </div>
  );
}

export function ClientUpdateCanvas({
  id,
  onCard,
}: {
  id: string;
  onCard: (card: Card) => void;
}) {
  const direction = id === 'updates';
  const details = direction
    ? [
        'design-principles',
        'new-materials',
        'paper-foundations',
        'requested-variations',
        'scout-lessons',
      ]
    : [
        'supplied-report-reality',
        'payload-guide',
        'implementation-readiness',
        'overlap-and-reasons',
        'next-evidence',
      ];
  return (
    <>
      {direction ? (
        <ClientDirectionVisual compact />
      ) : (
        <DataReadinessVisual compact />
      )}
      <div className="update-canvas-cards">
        {details.map((key) => {
          const card = getCard(key);
          return (
            <article key={key}>
              <span className={`kind-tag ${card.kind}`}>
                {cardKindLabel(card.kind)}
              </span>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
              <Button variant="outline" onClick={() => onCard(card)}>
                Read evidence <ArrowUpRight size={14} />
              </Button>
            </article>
          );
        })}
      </div>
      <p className="canvas-footnote">
        Grounded in the shared design requests and supplied report artifacts.
      </p>
    </>
  );
}

export function UpdateResourceLinks() {
  return (
    <div className="resource-links update-resource-links">
      {updateResources.map((resource) => (
        <a
          key={resource.url}
          href={resource.url}
          target="_blank"
          rel="noreferrer"
        >
          <FileText />
          <div>
            <b>{resource.title}</b>
            <span>{resource.description}</span>
          </div>
          <ArrowUpRight />
        </a>
      ))}
    </div>
  );
}
