'use client';

import { useId, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  Layers3,
  Mail,
  Radar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Scenario } from './wireframes';

type ExampleActions = {
  onWireframe: (scenario: Scenario) => void;
  onEmail: (quiet: boolean) => void;
};

export function ProductOverview({
  onWireframe,
}: Pick<ExampleActions, 'onWireframe'>) {
  const [tab, setTab] = useState<'product' | 'report'>('product');
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const tiles =
    tab === 'product'
      ? [
          {
            label: 'Who it serves',
            value: '2',
            unit: 'views',
            note: 'Own company & portfolio',
          },
          {
            label: 'Update cadence',
            value: 'Monthly',
            unit: '',
            note: 'Every generated report',
          },
          {
            label: 'Evidence',
            value: 'Public',
            unit: '',
            note: 'Sourced acquisitions',
          },
        ]
      : [
          {
            label: 'Statistics',
            value: '3',
            unit: 'tiles',
            note: 'Full-corpus counts',
          },
          {
            label: 'Buyer cards',
            value: '6',
            unit: 'max',
            note: 'Ranked by activity',
          },
          {
            label: 'Transactions',
            value: '20',
            unit: 'max',
            note: 'Sourced, newest first',
          },
        ];
  const rows =
    tab === 'product'
      ? [
          ['First report', 'Operator-triggered'],
          ['Watch controls', 'Personal email'],
          ['Lives inside', 'Vequity Intelligence'],
        ]
      : [
          ['Initial window', '24 months'],
          ['Under 10 deals', 'Extend to 5 years'],
          ['Missing value', 'Show n/d'],
        ];

  return (
    <section
      className="product-overview-widget"
      aria-label="Exit Radar at a glance"
    >
      <header className="widget-header">
        <span>
          <Radar size={18} />
          Exit Radar at a glance
        </span>
        <span className="widget-badge">v1</span>
      </header>
      <fieldset
        className="widget-switch"
        aria-label="Overview content"
        data-selected={tab}
      >
        <Button
          variant="ghost"
          aria-pressed={tab === 'product'}
          onClick={() => setTab('product')}
        >
          <Layers3 size={15} />
          Product
        </Button>
        <Button
          variant="ghost"
          aria-pressed={tab === 'report'}
          onClick={() => setTab('report')}
        >
          <Radar size={15} />
          Report
        </Button>
      </fieldset>
      <div className="overview-widget-panel" key={tab}>
        <dl className="overview-widget-tiles">
          {tiles.map((tile) => (
            <div key={tile.label}>
              <dt>{tile.label}</dt>
              <dd>
                <strong>{tile.value}</strong>
                <span>{tile.unit}</span>
              </dd>
              <dd className="overview-tile-note">
                <small>{tile.note}</small>
              </dd>
            </div>
          ))}
        </dl>
        <dl className="overview-widget-rows">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>
                <i aria-hidden="true" />
                {label}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Button
        className="widget-disclosure"
        variant="ghost"
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={() => setExpanded(!expanded)}
      >
        How the pieces fit
        <ChevronDown size={15} />
      </Button>
      <div
        className={`widget-expand ${expanded ? 'is-open' : ''}`}
        id={detailsId}
        aria-hidden={!expanded}
      >
        <div>
          <p>
            Start with the company and reporting window. Read the three
            statistics, inspect buyer patterns, then follow the sourced
            transactions. Monthly changes bring the same report up to date.
          </p>
        </div>
      </div>
      <Button
        className="widget-report-link"
        variant="ghost"
        onClick={() => onWireframe('sparse')}
      >
        Explore the ExampleCo report
        <ArrowUpRight size={15} />
      </Button>
    </section>
  );
}

export function EssentialsStack({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  const [opened, setOpened] = useState<number[]>([0]);
  const prefix = useId();
  const allOpen = opened.length === items.length;
  return (
    <section className="essentials-stack" aria-label="What to remember">
      <header className="stack-header">
        <div>
          <h3>What to remember</h3>
          <p>Three ideas to take with you.</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => setOpened(allOpen ? [] : items.map((_, i) => i))}
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
          <ChevronDown size={14} />
        </Button>
      </header>
      <ol className="essentials-stack-list">
        {items.map((item, index) => {
          const open = opened.includes(index);
          return (
            <li
              className={`essential-stack-card ${open ? 'is-open' : ''}`}
              key={item.title}
            >
              <Button
                variant="ghost"
                className="essential-stack-trigger"
                aria-expanded={open}
                aria-controls={`${prefix}-${index}`}
                onClick={() =>
                  setOpened((previous) =>
                    open
                      ? previous.filter((i) => i !== index)
                      : [...previous, index],
                  )
                }
              >
                <span className="stack-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="stack-item-title">{item.title}</span>
                <ChevronDown size={16} />
              </Button>
              <div
                id={`${prefix}-${index}`}
                className={`widget-expand ${open ? 'is-open' : ''}`}
                aria-hidden={!open}
              >
                <div>
                  <p>{item.text}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="stack-footnote">
        <Check size={14} />
        Open a card to read more. Source references are below.
      </p>
    </section>
  );
}

type TimelineEvent = {
  label: string;
  date: string;
  title: string;
  note: string;
  body: string;
  scenario?: Scenario;
  email?: boolean;
  action: string;
};
const journeyEvents: TimelineEvent[] = [
  {
    label: 'Before',
    date: 'the report',
    title: 'Being prepared',
    note: 'No report exists yet',
    body: 'The operator has not generated the first report. The page explains that it is being prepared, without promising a date.',
    scenario: 'preparing',
    action: 'See the preparing state',
  },
  {
    label: 'Aug 15',
    date: '2026',
    title: 'The first report is ready',
    note: '12 deals · 2 sourced rows',
    body: 'The operator creates ExampleCo’s first report. Alex can inspect the public acquisition evidence. There is no change summary because no previous run exists.',
    scenario: 'sparse',
    action: 'Open the first report',
  },
  {
    label: 'Optional',
    date: 'Alex’s choice',
    title: 'Watch this space',
    note: 'A personal email subscription',
    body: 'Alex chooses Watch for ExampleCo. This controls Alex’s emails for this company. The report refreshes monthly with or without watchers.',
    scenario: 'sparse',
    action: 'Try the Watch interaction',
  },
  {
    label: 'Sep 15',
    date: '2026',
    title: 'The next monthly report',
    note: '3 new deals · 1 new buyer',
    body: 'The report now has 15 deals. Northstar’s count increases from five to six, and Cedar Capital appears with two deals. Changes compare with the previous run.',
    scenario: 'refreshed',
    action: 'Open the refreshed report',
  },
  {
    label: 'After',
    date: 'the refresh',
    title: 'An email brings Alex back',
    note: 'The same headline as the report',
    body: 'The successful refresh triggers a short email to ExampleCo’s watchers. The message links to the report and leads with the same change headline.',
    email: false,
    action: 'Read Alex’s email',
  },
];
const refreshEvents = [journeyEvents[1], journeyEvents[3], journeyEvents[4]];

export function ReportTimeline({
  variant = 'journey',
  onWireframe,
  onEmail,
}: ExampleActions & { variant?: 'journey' | 'refresh' }) {
  const events = variant === 'journey' ? journeyEvents : refreshEvents;
  const [selected, setSelected] = useState(1);
  const panelId = useId();
  const current = events[selected];
  function openExample() {
    if (current.scenario) onWireframe(current.scenario);
    else if (current.email !== undefined) onEmail(current.email);
  }
  return (
    <section
      className="report-timeline-widget"
      aria-label="ExampleCo report timeline"
    >
      <header className="widget-header">
        <span>ExampleCo timeline</span>
        <span className="widget-badge">Fictional example</span>
      </header>
      <p className="timeline-instruction">
        Select a moment to explore what happens.
      </p>
      <ol className="report-timeline-events">
        {events.map((event, index) => (
          <li key={event.title}>
            <Button
              variant="ghost"
              className={`report-timeline-event ${selected === index ? 'is-selected' : ''}`}
              aria-pressed={selected === index}
              aria-controls={panelId}
              onClick={() => setSelected(index)}
            >
              <span className="timeline-date">
                <strong>{event.label}</strong>
                <small>{event.date}</small>
              </span>
              <span className="timeline-track" aria-hidden="true">
                <svg
                  viewBox="0 0 56 76"
                  width="56"
                  height="76"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {index > 0 && (
                    <path
                      className="timeline-track-line"
                      d="M16 0 V22 Q16 38 32 38"
                    />
                  )}
                  {index < events.length - 1 && (
                    <path
                      className="timeline-track-line"
                      d="M32 38 Q16 38 16 54 V76"
                    />
                  )}
                  <path className="timeline-track-branch" d="M16 38 H42" />
                  <circle cx="32" cy="38" r="3" />
                </svg>
              </span>
              <span className="timeline-event-copy">
                <strong>{event.title}</strong>
                <small>{event.note}</small>
              </span>
              <ChevronRight size={15} />
            </Button>
          </li>
        ))}
      </ol>
      <div
        id={panelId}
        className="timeline-selection"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="timeline-selection-copy" key={selected}>
          <span className="widget-eyebrow">
            MOMENT {selected + 1} OF {events.length}
          </span>
          <h4>{current.title}</h4>
          <p>{current.body}</p>
        </div>
        <Button variant="outline" onClick={openExample}>
          {current.email !== undefined && <Mail size={15} />}
          {current.action}
          <ArrowUpRight size={15} />
        </Button>
      </div>
      {variant === 'refresh' && (
        <div className="timeline-alternatives">
          <span>Other outcomes</span>
          <Button variant="ghost" onClick={() => onEmail(true)}>
            Quiet-month email
            <ArrowUpRight size={14} />
          </Button>
          <Button variant="ghost" onClick={() => onWireframe('retry')}>
            Refresh retry
            <ArrowUpRight size={14} />
          </Button>
        </div>
      )}
    </section>
  );
}
