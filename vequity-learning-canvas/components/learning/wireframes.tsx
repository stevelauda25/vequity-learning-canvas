'use client';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BellRing,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  ExternalLink,
  Info,
  LayoutDashboard,
  LoaderCircle,
  Mail,
  Radar,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

export const scenarios = [
  {
    id: 'sparse',
    name: 'Sparse ready',
    tag: 'Start here',
    description:
      'The common case: one buyer, two sourced rows, no capability chips, and undisclosed values. This example is an initial report, so no delta appears.',
  },
  {
    id: 'refreshed',
    name: 'ExampleCo: next month',
    tag: 'Continue the story',
    description:
      'The same ExampleCo report, at the next scheduled release on September 1: 12 → 15 deals, Northstar 5 → 6, and new buyer Cedar Capital with two deals. Three new sourced rows and one returning buyer’s increased count are visible.',
  },
  {
    id: 'dense',
    name: 'Dense ready',
    tag: 'Best case',
    description:
      'Six buyers and twenty sourced rows. A summary and individual badges make all three types of monthly change visible. This is the ceiling, not the default.',
  },
  {
    id: 'loading',
    name: 'Loading',
    tag: 'Fetching',
    description:
      'The report is being fetched. Skeletons preserve the page structure; they do not imply that no report exists.',
  },
  {
    id: 'preparing',
    name: 'Being prepared',
    tag: 'No report yet',
    description:
      'No report has been generated. Calm copy explains the situation without an error or a promised delivery date. First generation remains operator-triggered.',
  },
  {
    id: 'fallback',
    name: '5-year fallback',
    tag: 'Thin space',
    description:
      'Fewer than ten deals in the initial 24-month corpus widens the report to five years. Both the subtitle and deal-count tile explicitly name the actual window.',
  },
  {
    id: 'quiet',
    name: 'Quiet month',
    tag: 'Nothing new',
    description:
      'A successful refresh found no new activity. The page says so, and watchers still receive an email with the next check date.',
  },
  {
    id: 'retry',
    name: 'Refresh retry',
    tag: 'Last good report',
    description:
      'A failed refresh preserves the last successful report and its date. The next-update date moves to the retry. This explanation belongs to the learning canvas; no error banner appears inside the product.',
  },
  {
    id: 'history',
    name: 'Previous edition',
    tag: 'Design proposal',
    description:
      'Proposed scope addition: choose an earlier edition without changing its original data or your company Watch subscription. Return to September to see the latest report. Date-only next updates use the organization’s schedule; no publication hour is assumed.',
  },
] as const;
export type Scenario = (typeof scenarios)[number]['id'];
const buyers = [
  {
    name: 'Northstar Group',
    type: 'Strategic',
    count: 12,
    value: '$120m',
    chips: ['Benefits administration', 'Payments'],
    thesis: 'Expanding its employee benefits and payments offering.',
    delta: '+2 deals',
  },
  {
    name: 'Cedar Capital',
    type: 'PE',
    count: 8,
    value: '$85m',
    chips: ['Benefits administration'],
    thesis: 'Building a portfolio of specialist benefits businesses.',
    delta: '+1 deal',
  },
  {
    name: 'Meridian Systems',
    type: 'Strategic',
    count: 6,
    value: '$42m',
    chips: ['Payments'],
    thesis: 'Adding payment infrastructure to its existing services.',
    delta: '',
  },
  {
    name: 'Harbor Partners',
    type: 'PE',
    count: 5,
    value: 'n/d',
    chips: ['Compliance'],
    thesis: 'Acquiring complementary compliance service providers.',
    delta: '',
  },
  {
    name: 'Atlas Services',
    type: 'Strategic',
    count: 3,
    value: '$18m',
    chips: ['Benefits administration'],
    thesis: 'Broadening benefits services for mid-market employers.',
    delta: '',
  },
  {
    name: 'Pine Financial',
    type: 'Strategic',
    count: 2,
    value: 'n/d',
    chips: ['Payments'],
    thesis: 'Extending its financial services capabilities.',
    delta: 'New buyer',
  },
];
const assignments = [
  0, 1, 5, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 5,
];
const targets = [
  'Elm Benefits',
  'Birch Advisory',
  'Willow Pay',
  'Meadow Services',
  'Brook Benefits',
  'Grove Systems',
  'Field Partners',
  'Vale Solutions',
  'Oak Services',
  'Fern Advisory',
  'Maple Benefits',
  'Iris Payments',
  'Moss Processing',
  'Reed Systems',
  'Lark Compliance',
  'Finch Services',
  'Wren Advisory',
  'Clover Benefits',
  'Aspen Services',
  'Sage Finance',
];
const rows = assignments.map((buyer, i) => ({
  buyer: buyers[buyer].name,
  target: targets[i],
  date: new Date(Date.UTC(2026, 7, 28 - (i < 3 ? i * 7 : 33 + (i - 3) * 22)))
    .toISOString()
    .slice(0, 10),
  value:
    i === 0
      ? '$120m'
      : i === 1
        ? '$85m'
        : i === 11
          ? '$42m'
          : i === 17
            ? '$18m'
            : 'n/d',
  capability: i < 3 ? buyers[buyer].chips[0] : '',
  reason:
    i % 3 === 0
      ? '“Extend our benefits offering.”'
      : i % 3 === 1
        ? '“Expand our specialist services.”'
        : '“Add complementary payment capabilities.”',
}));
const initialRows = rows.slice(0, 2).map((row, i) => ({
  ...row,
  buyer: 'Northstar Group',
  value: 'n/d',
  capability: '',
  date: new Date(Date.UTC(2026, 7, 10 - i * 22)).toISOString().slice(0, 10),
}));
const refreshedRows = [
  { ...initialRows[0], target: 'Meadow Benefits', date: '2026-08-28' },
  {
    ...initialRows[1],
    buyer: 'Cedar Capital',
    target: 'Brook Advisory',
    date: '2026-08-22',
  },
  {
    ...initialRows[1],
    buyer: 'Cedar Capital',
    target: 'Grove Benefits',
    date: '2026-08-17',
  },
  ...initialRows,
];
const sourceLabel = 'Fictional source preview';

export function WireframeExplorer({
  open,
  onOpenChange,
  initial = 'sparse',
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Scenario;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="wireframe-modal" showCloseButton>
        <DialogTitle>Exit Radar · Wireframe explorer</DialogTitle>
        <DialogDescription>
          PRD-based design proposal · Reference mock pending · All example data
          is fictional
        </DialogDescription>
        <WireframeBody key={open ? initial : 'closed'} initial={initial} />
      </DialogContent>
    </Dialog>
  );
}
function WireframeBody({ initial }: { initial: Scenario }) {
  const [scenario, setScenario] = useState<Scenario>(initial);
  const [persona, setPersona] = useState<'own' | 'portco'>('own');
  const [watched, setWatched] = useState({ own: false, portco: false });
  const [message, setMessage] = useState('');
  const [sample, setSample] = useState<number | null>(null);
  const [email, setEmail] = useState(false);
  const current = scenarios.find((s) => s.id === scenario)!;
  const dense = scenario === 'dense';
  const refreshed = scenario === 'refreshed';
  const fallback = scenario === 'fallback';
  const quiet = scenario === 'quiet';
  const retry = scenario === 'retry';
  const historical = scenario === 'history';
  const loading = scenario === 'loading';
  const preparing = scenario === 'preparing';
  const company = persona === 'own' ? 'ExampleCo' : 'Example Portfolio Co';
  const window = fallback ? '5 years' : '24 months';
  const next = retry
    ? 'Sep 2, 2026'
    : scenario === 'sparse' || fallback
      ? 'Sep 1, 2026'
      : 'Oct 1, 2026';
  const reportDate =
    retry || historical || scenario === 'sparse' || fallback
      ? 'Aug 15, 2026'
      : 'Sep 1, 2026';
  const visibleRows = dense ? rows : refreshed ? refreshedRows : initialRows;
  const watch = () => {
    const value = !watched[persona];
    setWatched((prev) => ({ ...prev, [persona]: value }));
    setMessage(
      value
        ? 'Watching this company. You’ll receive an email after every monthly refresh.'
        : 'You’ve stopped watching this company. Refresh emails are turned off.',
    );
  };
  return (
    <>
      <fieldset className="scenario-tabs" aria-label="Report scenario">
        {scenarios.map((s) => (
          <Button
            key={s.id}
            variant={scenario === s.id ? 'default' : 'ghost'}
            onClick={() => {
              setScenario(s.id);
              setMessage('');
            }}
            aria-pressed={scenario === s.id}
          >
            {s.name}
          </Button>
        ))}
      </fieldset>
      <div className="scenario-note">
        <Info size={16} />
        <p>{current.description}</p>
      </div>
      <div className="wireframe-tools">
        <div className="segmented">
          <Button
            variant={persona === 'own' ? 'secondary' : 'ghost'}
            onClick={() => {
              setPersona('own');
              setMessage('');
            }}
            aria-pressed={persona === 'own'}
          >
            <Building2 size={14} /> Own company
          </Button>
          <Button
            variant={persona === 'portco' ? 'secondary' : 'ghost'}
            onClick={() => {
              setPersona('portco');
              setMessage('');
            }}
            aria-pressed={persona === 'portco'}
          >
            Portfolio company
          </Button>
        </div>
        <Button
          variant="outline"
          disabled={!dense && !refreshed && !quiet}
          title={
            !dense && !refreshed && !quiet
              ? 'Emails follow a successful monthly refresh. Choose next month or quiet month.'
              : undefined
          }
          onClick={() => setEmail(true)}
        >
          <Mail size={14} /> Preview email
        </Button>
      </div>
      <div className="product-frame">
        <aside className="product-sidebar">
          <span className="product-wordmark">
            vequity<span> / Intelligence</span>
          </span>
          <span>
            <LayoutDashboard size={14} /> Company home
          </span>
          <span className="product-nav-active">
            <Radar size={14} /> Exit Radar
          </span>
          <div className="product-org">
            <Building2 size={15} />
            <div>
              {persona === 'own' ? 'ExampleCo' : 'Example Fund'}
              <small>
                {persona === 'own'
                  ? 'Strategic organization'
                  : 'Investment organization'}
              </small>
            </div>
          </div>
        </aside>
        <main className="product-main">
          <div className="product-breadcrumb">
            Intelligence <ChevronRight size={11} />
            {persona === 'portco' && (
              <>
                Portfolio <ChevronRight size={11} />
              </>
            )}
            {company} <ChevronRight size={11} /> Exit Radar
          </div>
          {loading ? (
            <div className="report-loading">
              <div className="skeleton sk-title" />
              <div className="skeleton sk-copy" />
              <div className="sk-grid">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="skeleton sk-tile" />
                ))}
              </div>
              <div className="skeleton sk-copy" />
              <div className="sk-grid">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="skeleton sk-buyer" />
                ))}
              </div>
              <output className="loading-announcement">
                <LoaderCircle className="spin" size={15} /> Loading your report
              </output>
            </div>
          ) : preparing ? (
            <div className="report-preparing">
              <span className="preparing-icon">
                <Radar size={34} />
              </span>
              <span className="card-kicker">EXIT RADAR</span>
              <h2>Your buyer landscape is taking shape.</h2>
              <p>
                We’re preparing a sourced view of who is buying in {company}’s
                space. Your report will appear here when it’s ready.
              </p>
              <div>
                <ShieldCheck size={14} /> Grounded in public acquisition
                evidence
              </div>
            </div>
          ) : (
            <>
              <div className="report-title-row">
                <div>
                  <span className="report-eyebrow">EXIT RADAR</span>
                  <h2>Who is buying in {company}’s space</h2>
                </div>
                <Button
                  onClick={watch}
                  variant={watched[persona] ? 'secondary' : 'outline'}
                  className="watch-button"
                  aria-pressed={watched[persona]}
                >
                  {watched[persona] ? (
                    <BellRing size={14} />
                  ) : (
                    <Bell size={14} />
                  )}{' '}
                  {watched[persona] ? 'Watching' : 'Watch this space'}
                </Button>
              </div>
              <p className="report-subtitle">
                Acquisition activity over the last {window}. Checked chips mark
                capabilities you hold. Buyer counts include all deals in the
                space; the table shows sourced transactions only.
              </p>
              {(refreshed || historical) && (
                <div className="report-edition-control">
                  <label>
                    <span>Report edition</span>
                    <select
                      value={historical ? 'august' : 'september'}
                      onChange={(event) => {
                        setScenario(event.target.value === 'august' ? 'history' : 'refreshed');
                        setSample(null);
                        setMessage('');
                      }}
                    >
                      <option value="september">September 2026 · Latest</option>
                      <option value="august">August 2026 · First report</option>
                    </select>
                  </label>
                  {historical && (
                    <Button variant="outline" onClick={() => setScenario('refreshed')}>
                      View latest report <ArrowRight size={14} />
                    </Button>
                  )}
                </div>
              )}
              {historical && (
                <output className="report-archive-notice">
                  <Clock3 size={16} />
                  <div><strong>Viewing a previous edition</strong><p>This is the original August report. September 2026 is the latest edition.</p></div>
                </output>
              )}
              <div className="report-dates">
                {!historical && <span>
                  <CalendarDays size={13} /> Next update: <b>{next}</b>
                </span>}
                <span>Report updated {reportDate}</span>
                {!historical && <span>Dates follow the organization’s schedule</span>}
              </div>
              {message && (
                <output className="watch-message">
                  <Check size={14} />
                  {message}
                  <small>
                    Prototype only · no email subscription is created
                  </small>
                </output>
              )}
              <div className="stats-strip">
                <div>
                  <span>Deals in the space</span>
                  <strong>
                    {dense ? '40' : refreshed ? '15' : fallback ? '7' : '12'}
                  </strong>
                  <small>
                    Last {window}
                    {fallback ? ' · Extended window' : ''}
                  </small>
                </div>
                <div>
                  <span>Strategic acquirers</span>
                  <strong>
                    {dense || refreshed ? '60' : fallback ? '57' : '67'}
                    <em>%</em>
                  </strong>
                  <small>Of all deals in the window</small>
                </div>
                <div>
                  <span>PE / investment acquirers</span>
                  <strong>
                    {dense ? '30' : refreshed ? '27' : fallback ? '29' : '17'}
                    <em>%</em>
                  </strong>
                  <small>Of all deals in the window</small>
                </div>
              </div>
              {(dense || refreshed) && (
                <div className="change-strip">
                  <span className="change-icon">
                    <ArrowUpRight size={18} />
                  </span>
                  <div>
                    <strong>3 new deals, 1 new buyer in your space</strong>
                    <p>
                      Since Aug 15, 2026 ·{' '}
                      {refreshed
                        ? '1 returning buyer increased its deal count.'
                        : '2 returning buyers increased their deal counts.'}
                    </p>
                  </div>
                  <span className="small-pill">This month</span>
                </div>
              )}
              {quiet && (
                <div className="change-strip quiet">
                  <Clock3 size={19} />
                  <div>
                    <strong>No new activity since Aug 15, 2026</strong>
                    <p>
                      Your report was refreshed on Sep 1. Next check: Oct 1,
                      2026.
                    </p>
                  </div>
                </div>
              )}
              <div className="report-section-title">
                <h3>Most active buyers</h3>
                <span>
                  Ranked by activity, capability overlap, then recency
                </span>
              </div>
              <div className={`buyer-grid ${!dense ? 'sparse-buyers' : ''}`}>
                {(dense
                  ? buyers
                  : refreshed
                    ? [
                        {
                          ...buyers[0],
                          count: 6,
                          value: 'n/d',
                          chips: [],
                          delta: '+1 deal',
                          thesis:
                            'Acquiring businesses in the employee benefits space.',
                        },
                        {
                          ...buyers[1],
                          count: 2,
                          value: 'n/d',
                          chips: [],
                          delta: 'New buyer',
                        },
                      ]
                    : [
                        {
                          ...buyers[0],
                          count: fallback ? 4 : 5,
                          value: 'n/d',
                          chips: [],
                          delta: '',
                          thesis:
                            'Acquiring businesses in the employee benefits space.',
                        },
                      ]
                ).map((b, i) => (
                  <article className="buyer-card" key={b.name}>
                    <div className="buyer-title">
                      <span className={`buyer-avatar avatar-${i}`}>
                        {b.name
                          .split(' ')
                          .map((x) => x[0])
                          .join('')}
                      </span>
                      <div>
                        <h4>{b.name}</h4>
                        <span className="buyer-type">{b.type}</span>
                      </div>
                      {b.delta && (
                        <span
                          className={`delta-badge ${b.delta === 'New buyer' ? 'new' : ''}`}
                        >
                          {b.delta}
                        </span>
                      )}
                    </div>
                    <div className="buyer-metrics">
                      <span>
                        <b>{b.count}</b> deals in the space
                      </span>
                      <span>
                        <b>{b.value}</b> largest disclosed
                      </span>
                    </div>
                    {b.chips.length > 0 && (
                      <div className="capabilities">
                        {b.chips.map((c) => (
                          <span
                            key={c}
                            className={
                              c === 'Benefits administration' ? 'overlap' : ''
                            }
                            title={
                              c === 'Benefits administration'
                                ? 'Matches a capability you hold'
                                : 'Evidenced buyer capability'
                            }
                          >
                            {c === 'Benefits administration' && (
                              <>
                                <Check size={10} aria-hidden="true" />
                                <span className="sr-only">
                                  Matches a capability you hold:{' '}
                                </span>
                              </>
                            )}
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                    <p>{b.thesis}</p>
                  </article>
                ))}
              </div>
              <div className="report-section-title">
                <h3>Recent transactions</h3>
                <span>
                  {dense
                    ? '20 most recent sourced transactions'
                    : refreshed
                      ? '5 sourced transactions'
                      : '2 sourced transactions'}
                </span>
              </div>
              <div className="report-table-wrap">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Buyer → target</th>
                      <th>Capabilities added</th>
                      <th>Value</th>
                      <th>Stated reason</th>
                      <th>Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((r, i) => (
                      <tr key={r.target}>
                        <td>
                          {r.date}
                          {(dense || refreshed) && i < 3 && (
                            <span className="table-new">New</span>
                          )}
                        </td>
                        <td>
                          <b>{r.buyer}</b>
                          <span>→ {r.target}</span>
                        </td>
                        <td>
                          {dense && r.capability ? (
                            <span className="table-chip">{r.capability}</span>
                          ) : (
                            <span
                              className="no-capability"
                              aria-label="No derived capability"
                            >
                              —
                            </span>
                          )}
                        </td>
                        <td>{r.value}</td>
                        <td>
                          <span className="reason-quote">{r.reason}</span>
                        </td>
                        <td>
                          <button
                            className="sample-source"
                            onClick={() => setSample(i)}
                            aria-label={`Open sample source for ${r.target}`}
                          >
                            Sample <ExternalLink size={11} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="report-footnote">
                <ShieldCheck size={12} /> Sources are shown for every row. All
                displayed companies, figures, and quotes in this wireframe are
                fictional.
              </div>
            </>
          )}
        </main>
      </div>
      <div className="wireframe-annotations">
        <span>
          <span className="legend-dot requirement" /> PRD requirement
        </span>
        <p>
          <b>Design proposal:</b> Watch / Unwatch with inline feedback, change
          summary placement, and the visual layout. Reference mock pending.
        </p>
      </div>
      <Dialog
        open={sample !== null}
        onOpenChange={(o) => !o && setSample(null)}
      >
        <DialogContent className="source-sample-modal">
          <DialogTitle>{sourceLabel}</DialogTitle>
          <DialogDescription>
            This illustrates a sourced transaction. It is not a real article or
            an acquisition claim.
          </DialogDescription>
          <div className="sample-article">
            <span className="sample-label">FICTIONAL EXAMPLE</span>
            <h3>
              {sample !== null
                ? `${visibleRows[sample].buyer} acquires ${visibleRows[sample].target}`
                : ''}
            </h3>
            <p>{sample !== null ? visibleRows[sample].reason : ''}</p>
            <p>
              In the real product, this control opens the recorded external
              press release or article. The PRD requires a working source for
              every displayed row.
            </p>
            <a href="/sources/prd.pdf#page=9" target="_blank" rel="noreferrer">
              Read the source requirement <ArrowUpRight size={13} />
            </a>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={email} onOpenChange={setEmail}>
        <DialogContent className="email-modal">
          <DialogTitle>Refresh notification preview</DialogTitle>
          <DialogDescription>
            Fictional content · Sent only to this company’s watchers after a
            successful monthly refresh
          </DialogDescription>
          <EmailPreview
            quiet={quiet}
            company={company}
            returningBuyers={refreshed ? 1 : 2}
            onReport={() => {
              setEmail(false);
              setScenario(quiet ? 'quiet' : refreshed ? 'refreshed' : 'dense');
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
export function EmailPreview({
  quiet,
  company = 'ExampleCo',
  returningBuyers = 2,
  onReport,
}: {
  quiet: boolean;
  company?: string;
  returningBuyers?: number;
  onReport: () => void;
}) {
  return (
    <div className="email-preview">
      <div className="email-envelope">
        <span>
          From <b>Vequity</b>
        </span>
        <span>
          To <b>A watcher of {company}</b>
        </span>
        <span>
          Subject{' '}
          <b>
            {quiet
              ? 'No new activity in your space'
              : '3 new deals, 1 new buyer in your space'}
          </b>
        </span>
      </div>
      <div className="email-letter">
        <span className="product-wordmark">vequity</span>
        <p className="email-eyebrow">YOUR EXIT RADAR UPDATE</p>
        <h2>
          {quiet
            ? 'A quiet month. You’re up to date.'
            : 'A new month. A clearer picture.'}
        </h2>
        <h3>
          {quiet
            ? 'No new activity since Aug 15, 2026.'
            : '3 new deals, 1 new buyer in your space.'}
        </h3>
        <p>
          {quiet
            ? `We refreshed ${company}’s report and found no new activity. Your next check is Oct 1, 2026.`
            : `Your refreshed report for ${company} is ready. ${returningBuyers === 1 ? 'One returning buyer also increased its deal count.' : 'Two returning buyers also increased their deal counts.'} Explore the latest sourced activity in your space.`}
        </p>
        <Button onClick={onReport}>
          View your report <ArrowRight size={15} />
        </Button>
        <footer>
          You’re receiving this because you’re watching {company}.<br />
          Next update: Oct 1, 2026.
        </footer>
      </div>
    </div>
  );
}
