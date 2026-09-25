import { clientUpdateLessons } from './client-updates.ts';

export type Lesson = {
  id: string;
  question: string;
  answer: string;
  essentials: { title: string; text: string }[];
  story: { title: string; text: string };
  storyLabel?: string;
  storyNote?: string;
  terms: string[];
  details: string[];
  quiz: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
};

// Eight foundational lessons follow ExampleCo; two update lessons use supplied
// client evidence. Requirements remain linked to their original sources.
export const lessons: Lesson[] = [
  {
    id: 'overview',
    question: 'What does Exit Radar help me understand?',
    answer:
      'Who is buying businesses like yours, why they are buying, and what changed this month. Exit Radar brings that public acquisition evidence into one report inside Vequity Intelligence.',
    essentials: [
      {
        title: 'Who is buying?',
        text: 'See active buyers in your company’s space and the acquisitions behind their activity.',
      },
      {
        title: 'Why are they buying?',
        text: 'Read sourced acquisition reasons and capabilities supported by the available evidence.',
      },
      {
        title: 'What changed?',
        text: 'After a refresh, see new sourced deals, new buyers, and buyers whose deal counts increased.',
      },
    ],
    story: {
      title: 'Meet ExampleCo',
      text: 'ExampleCo is a fictional employee benefits business. Alex, an active member of its Intelligence organization, wants to understand the companies acquiring businesses in its space. We’ll follow Alex from the first report to the next monthly update.',
    },
    terms: ['Space'],
    details: ['concept', 'evidence', 'return'],
    quiz: {
      question: 'What should Alex expect from Exit Radar?',
      options: [
        'A prediction of who will acquire ExampleCo.',
        'A sourced picture of acquisition activity around ExampleCo.',
        'Access to other firms’ private acquisition mandates.',
      ],
      correct: 1,
      explanation:
        'Exit Radar explains observed public acquisition activity. It does not promise a future buyer, and other firms’ private criteria and activity are never report inputs.',
    },
  },
  {
    id: 'people',
    question: 'Whose company am I looking at?',
    answer:
      'The report is always about a specific company. A strategic company views itself; an investment firm views one of its portfolio companies. Both use the same report structure.',
    essentials: [
      {
        title: 'Strategic company',
        text: 'Open Intelligence → Exit Radar, or the Exit Radar card on Company Home. The report is about your own company.',
      },
      {
        title: 'Investment firm',
        text: 'Open a portfolio company → Exit Radar. The report is about that portfolio company, not the investment firm.',
      },
      {
        title: 'Access stays within the organization',
        text: 'V1 serves existing active buyer-role members of Intelligence-enabled organizations. Other organizations, advisors, and public visitors cannot access the report.',
      },
    ],
    story: {
      title: 'Alex opens ExampleCo’s report',
      text: 'Alex sees the acquisition landscape around ExampleCo. In the investment-firm version, the same page would describe a selected portfolio company. Watching one company subscribes only Alex to that company’s emails.',
    },
    terms: ['Subject', 'Strategic buyer', 'PE / investment buyer', 'Portco'],
    details: ['strategic', 'investment', 'access'],
    quiz: {
      question:
        'An investment firm opens Exit Radar for one portfolio company. What is the report about?',
      options: [
        'That portfolio company’s acquisition landscape.',
        'Every company in the portfolio combined.',
        'The investment firm’s private acquisition criteria.',
      ],
      correct: 0,
      explanation:
        'The selected portfolio company is the subject. The structure is shared with the own-company view, and access follows the organization’s existing Intelligence permissions.',
    },
  },
  {
    id: 'journey',
    question: 'How does someone get their first report?',
    answer:
      'An operator triggers the first report. Until it exists, the page says it is being prepared. Once it is ready, members can explore it and optionally Watch for monthly emails.',
    essentials: [
      {
        title: 'Before the report exists',
        text: 'Show a “being prepared” message with no promised arrival date. Onboarding does not automatically generate a report in v1.',
      },
      {
        title: 'When the first report is ready',
        text: 'Show the report without a change summary: there is no previous run to compare with.',
      },
      {
        title: 'When Alex selects Watch',
        text: 'Subscribe Alex to ExampleCo’s refresh emails. The report refreshes monthly whether anyone watches it or not.',
      },
    ],
    story: {
      title: 'August 15 · The first report arrives',
      text: 'An operator has prepared ExampleCo’s first report. Alex sees 12 deals in the last 24 months, one displayed buyer, and two sourced transaction rows. Alex selects Watch to receive the next monthly update.',
    },
    terms: [],
    details: ['first-report', 'journey-flow', 'watch-design', 'monthly-publication'],
    quiz: {
      question: 'If nobody selects Watch, what happens to an existing report?',
      options: [
        'It stops refreshing until someone watches.',
        'It is replaced by the “being prepared” message.',
        'It still refreshes monthly; no watcher email is sent.',
      ],
      correct: 2,
      explanation:
        'Report generation and email subscriptions are separate. Every generated report refreshes monthly; Watch controls the current user’s email for this company.',
    },
  },
  {
    id: 'report',
    question: 'How do I read the report?',
    answer:
      'Start with the company and reporting window, then scan the three statistics. Read the buyer cards for patterns and the transaction table for evidence. After a refresh, the change summary tells you what is new.',
    essentials: [
      {
        title: 'Orient yourself',
        text: 'The header names the company, explains the actual reporting window and capability markers, and shows the scheduled next update and Watch control.',
      },
      {
        title: 'Read the big numbers, then the buyers',
        text: 'Exactly three statistics show total deals, strategic share, and PE share. Up to six buyer cards show activity, disclosed values, evidenced capabilities, and a short buying thesis.',
      },
      {
        title: 'Inspect the evidence',
        text: 'Up to twenty sourced transactions appear newest first. Each row includes a source; a missing disclosed value is shown as n/d.',
      },
    ],
    story: {
      title: 'Alex reads from the overview to the evidence',
      text: 'ExampleCo’s first report shows 12 deals. Northstar Group has five deals in the space, while the table shows only two sourced rows. These numbers describe different sets of evidence; the next chapter explains why.',
    },
    terms: ['Buying thesis', 'n/d'],
    details: [
      'report-header',
      'report-stats',
      'report-buyers',
      'report-transactions',
      'report-delta',
    ],
    quiz: {
      question:
        'Where should Alex go to check the evidence behind a listed transaction?',
      options: [
        'The buyer’s deal count alone.',
        'The transaction’s recorded source link.',
        'The percentage tiles.',
      ],
      correct: 1,
      explanation:
        'Every displayed transaction must have a working recorded source. The wireframe’s Sample source opens clearly labeled fictional evidence; the product links to the actual article or release.',
    },
  },
  {
    id: 'rules',
    question: 'Why don’t all the numbers match the visible rows?',
    answer:
      'The statistics and buyer counts use the full set of deals in the report window. The table shows only sourced transactions, with a maximum of twenty rows. It is a limited view of the evidence.',
    essentials: [
      {
        title: 'Count the whole set',
        text: 'The total and both buyer percentages use every deal in the window, including unclassified buyers. Strategic and PE percentages may add up to less than 100%.',
      },
      {
        title: 'Name the actual window',
        text: 'Start with 24 months. Fewer than 10 deals in that initial window triggers a five-year report, explicitly labeled. Ten deals exactly does not trigger this fallback.',
      },
      {
        title: 'Keep every claim grounded',
        text: 'Use only derived capability chips, show n/d for undisclosed values, and rank buyers by deal count, then capability overlap, then recency.',
      },
    ],
    story: {
      title: '12 deals does not mean 12 visible rows',
      text: 'ExampleCo’s fictional corpus has 8 strategic, 2 PE, and 2 unclassified deals: approximately 67% strategic and 17% PE. The table has two sourced rows. Neither missing rows nor unclassified buyers should be hidden by changing the denominator.',
    },
    terms: ['Corpus', 'Capability'],
    details: ['counts', 'window', 'chips', 'ranking', 'data-reality'],
    quiz: {
      question:
        'A first report finds 9 deals across 24 months, with only 2 sourced rows. What should happen?',
      options: [
        'Use the two table rows as the statistical denominator.',
        'Keep 24 months and invent enough rows to reach ten.',
        'Extend the report to five years and clearly label that window.',
      ],
      correct: 2,
      explanation:
        'The initial fallback depends on fewer than ten deals in the full 24-month corpus. The visible-row count does not decide the window. Evidence is never invented to fill a layout.',
    },
  },
  {
    id: 'states',
    question: 'What if the report has very little data?',
    answer:
      'A small, honest report is a valid report. Sparse data is the primary design case: a few buyers and rows, missing chips, and undisclosed values. Loading, no report yet, and a quiet refresh each mean something different.',
    essentials: [
      {
        title: 'Sparse is ready',
        text: 'ExampleCo’s one buyer and two sourced rows are usable evidence. Do not pad the page with invented capabilities, values, or acquisition reasons.',
      },
      {
        title: 'Loading is temporary',
        text: 'The page is fetching report data. A loading state does not mean that no report has been generated.',
      },
      {
        title: 'Being prepared means no report exists yet',
        text: 'Keep the message calm and avoid a delivery promise. A quiet month, by contrast, is a successfully refreshed report with no new activity.',
      },
    ],
    story: {
      title: 'Alex can trust an incomplete-looking page',
      text: 'Northstar’s card has no capability chips and no disclosed value in the first ExampleCo report. The evidence is limited. The dense wireframe is a separate illustration of the maximum layout, not the expected amount of data.',
    },
    terms: [],
    details: ['states-overview', 'data-reality', 'watch-design', 'report-history'],
    quiz: {
      question:
        'A sourced transaction has no derived capability. What should the page do?',
      options: [
        'Leave capability chips absent.',
        'Infer a plausible capability to complete the row.',
        'Show a report failure.',
      ],
      correct: 0,
      explanation:
        'Missing capabilities are an honest data state. A chip is a factual claim and can appear only when the capability is actually derived.',
    },
  },
  {
    id: 'delivery',
    question: 'What changes when Alex returns next month?',
    answer:
      'On the 1st of each month, publish the refreshed report and compare it with the previous run. Watchers receive the matching email once the report is available—even when nothing is new.',
    essentials: [
      {
        title: 'An active month',
        text: 'Identify new sourced deals, buyers new to the displayed list, and existing buyers with higher deal counts. Lead the page and email with the same change headline.',
      },
      {
        title: 'A quiet month',
        text: 'Explicitly say no new activity was found since the previous refresh. Keep the report and send watchers a quiet-month email with the next check date.',
      },
      {
        title: 'A failed refresh',
        text: 'Keep the last good report and its date. Move the next-update date to the scheduled retry, with no member-facing error banner. The schedule supplies the date.',
      },
    ],
    story: {
      title: 'September 1 · Alex receives an update',
      text: 'In our continuing example, three new sourced deals bring ExampleCo’s total from 12 to 15. Northstar grows from five to six deals; Cedar Capital appears with two. The email announces “3 new deals, 1 new buyer in your space” and links to the refreshed report.',
    },
    terms: ['Delta'],
    details: ['monthly-publication', 'schedule', 'publication-timezone', 'email', 'report-delta', 'engineering-direction'],
    quiz: {
      question:
        'Alex last visited three months ago. What is the change summary compared with?',
      options: [
        'Alex’s last visit.',
        'The previous report run.',
        'The date Alex selected Watch.',
      ],
      correct: 1,
      explanation:
        'The comparison is report-to-report, not visit-to-visit. Alex receives the same report changes as other permitted viewers; Watch only controls personal email delivery.',
    },
  },
  {
    id: 'scope',
    question: 'What are we actually shipping in v1?',
    answer:
      'A trusted monthly report inside the existing Intelligence experience: own-company and portfolio-company views, public transaction evidence, visible changes, and personal Watch emails.',
    essentials: [
      {
        title: 'Required behavior',
        text: 'Report access, evidence rules, monthly refresh, email delivery, and all report states come from the PRD. The first report stays operator-triggered.',
      },
      {
        title: 'Design proposals to review',
        text: 'The edition selector and organization-based publication time zone are new proposals. History extends the original v1 scope. Layouts, change presentation and the reversible Watch interaction are also design proposals.',
      },
      {
        title: 'Outside v1',
        text: 'No self-serve signup, automatic first report, cadence chooser, positioning advice, or full report inside email. Broader automation and guidance remain future possibilities.',
      },
    ],
    story: {
      title: 'The complete ExampleCo loop',
      text: 'An operator prepares the report. Alex explores public evidence and chooses Watch. The report refreshes on the 1st. An email brings Alex back to the changes—or confirms a quiet month. That is the v1 experience.',
    },
    terms: [],
    details: ['in-scope', 'non-goals', 'report-history', 'publication-timezone', 'open-questions', 'rollout'],
    quiz: {
      question: 'Which behavior is part of v1?',
      options: [
        'Let Alex choose daily, weekly, or monthly emails.',
        'Automatically create a first report during onboarding.',
        'Send Alex a short monthly refresh email after selecting Watch.',
      ],
      correct: 2,
      explanation:
        'V1 uses a fixed monthly cadence with personal subscriptions. The email is a headline and link; it does not contain the whole report. First generation remains operator-triggered.',
    },
  },
  ...clientUpdateLessons,
];

export const learningProgressKey = 'vequity-knowledge-checks-v1';
export type LearningAnswers = Record<string, string>;

export function checkedLessons(answers: unknown): string[] {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers))
    return [];
  return lessons
    .filter(
      (lesson) =>
        (answers as LearningAnswers)[lesson.id] ===
        lesson.quiz.options[lesson.quiz.correct],
    )
    .map((lesson) => lesson.id);
}
