import type { Card, Source } from './knowledge';
import type { Lesson } from './learning-path';

const base = '/sources/client-updates';
export const updateSources = {
  brief: {
    doc: 'reference',
    label: 'Shared messages · design request',
    url: `${base}/client-direction.html#design-request`,
  },
  schema: {
    doc: 'reference',
    label: 'JSON for Design · 21 Sep 2026',
    url: `${base}/json-for-design.html`,
  },
  report: {
    doc: 'reference',
    label: 'VanZandt / Eagle Automation · supplied HTML',
    url: `${base}/report.html`,
  },
  video: {
    doc: 'reference',
    label: 'Harmonic Scout · supplied video',
    url: `${base}/scout-demo.mp4`,
  },
} satisfies Record<string, Source>;

export const updateResources = [
  { title: 'Monthly publication alignment', description: '25 Sep discussion · first-of-month release, timezone proposal, and edition history', url: '/sources/client-updates/monthly-alignment.html' },
  {
    title: 'Design direction & exploration brief',
    description:
      'Shared design requests · Paper foundation, variations, and data visualization',
    url: updateSources.brief.url,
  },
  {
    title: 'Exit Radar JSON for Design',
    description:
      'Readable documentation · implementation snapshot dated 21 Sep 2026',
    url: updateSources.schema.url,
  },
  {
    title: 'VanZandt / Eagle Automation report',
    description: 'Original client HTML · includes internal operator sections',
    url: updateSources.report.url,
  },
  {
    title: 'Acme Payroll sample JSON',
    description:
      'Fictional example extracted from the documentation · not the VanZandt payload',
    url: `${base}/sample.json`,
  },
  {
    title: 'Harmonic Scout demo',
    description:
      '2:23 video with burned-in subtitles · inspiration, not added product scope',
    url: updateSources.video.url,
  },
];

export const readiness = [
  {
    feature: 'Capability overlap',
    status: 'Needs clarification',
    detail:
      'The messages say it still needs to be added; the document already lists overlap fields. Confirm whether they are implemented and populated.',
  },
  {
    feature: 'Largest disclosed value on buyer cards',
    status: 'Field absent',
    detail:
      'Cards have no value field. Do not calculate a corpus-wide maximum from the limited transactions table.',
  },
  {
    feature: 'Next-update date',
    status: 'Response field absent',
    detail:
      'The note says the server computes the next first of the month, but the API response does not yet include the date.',
  },
  {
    feature: 'What’s changed / delta',
    status: 'Unmerged branch',
    detail:
      'The note places new buyers, new deal references, increased buyer counts and quietMonth on an open branch.',
  },
  {
    feature: 'Watch',
    status: 'Unmerged branch',
    detail:
      'The backend is described on that same branch. The old availability button only saves to the browser.',
  },
  {
    feature: 'Customer report access',
    status: 'Admin-only endpoint',
    detail:
      'Customer access is a remaining implementation dependency in this snapshot.',
  },
];

export const explorationDirections = [
  {
    name: 'Simple',
    question: 'Can someone understand the report quickly?',
    detail:
      'Clear hierarchy, readable evidence, and useful layouts when fields are missing.',
  },
  {
    name: 'Cards & table',
    question: 'Can someone scan buyers and transactions easily?',
    detail:
      'Explore identity, logos where available, information density, and access to detail.',
  },
  {
    name: 'Changes first',
    question: 'Can a returning reader spot what is new?',
    detail:
      'Explore new transactions, buyers new to the list, and increased buyer activity.',
  },
];

export const clientUpdateCards: Card[] = [
  {
    id: 'design-principles',
    chapter: 'updates',
    kind: 'update',
    title: 'Make the report easy to scan, insightful, and interesting',
    summary:
      'The client wants clear information hierarchy, useful insights, and a more engaging way to understand each report.',
    points: [
      'Easy to scan, insightful, and interesting are the client’s stated goals for the report.',
      'Our design interpretation: make the main facts visible first, then let readers inspect buyer relevance, transactions, and supporting evidence.',
      'Explore a simple treatment, alternative cards and tables, and a clearer way to show what is new between reports.',
      'Keep the existing theme and navigation from Paper. The supplied HTML demonstrates report content and is explicitly described as an example.',
      'The client is open to improved data or a different response structure when it makes a table, graph, or other visualization more useful.',
    ],
    sources: [updateSources.brief],
  },
  {
    id: 'new-materials',
    chapter: 'updates',
    kind: 'update',
    title: 'Use each reference for the right decision',
    summary:
      'The brief defines behavior, Paper defines the visual foundation, and the new artifacts explain data and inspiration.',
    points: [
      'The supplied Drive folder contains a JSON-for-design Markdown document and an HTML report for VanZandt Controls/Eagle Automation.',
      'The Markdown describes the structure and includes a fictional Acme Payroll example. It is not the actual JSON payload behind the VanZandt HTML.',
      'The client explicitly says the HTML is just an example. It is not a final layout or a replacement for the PRD.',
      'Paper contains design tokens, the existing Intelligence page, and an Exit Radar page prepared by the client. Its link has not yet been supplied in this conversation, so the actual file has not been inspected here.',
      'The Harmonic Scout video is a reference for recurring, relevant reports. It does not add its features to Exit Radar’s requirements.',
    ],
    sources: [
      updateSources.brief,
      updateSources.schema,
      updateSources.report,
      updateSources.video,
    ],
  },
  {
    id: 'paper-foundations',
    chapter: 'updates',
    kind: 'update',
    title: 'Reuse the existing Paper foundation',
    summary:
      'Keep the client’s theme and navigation, using the Intelligence page as the visual reference.',
    points: [
      'The client wants the same theme and navigation and suggests copying useful patterns from the Intelligence page.',
      'An Exit Radar page has already been created in Paper. Access was described as shared through the team account; the file itself remains to be inspected here.',
      'The client mentions Paper’s component limitations and a possible future return to Figma, but says to continue in Paper for now. A migration is not approved work.',
      'The grayscale and blue styling of this learning canvas is a learning-workspace preference. It does not establish the product’s final design tokens.',
      'Inspect the real Paper file to establish the product styling and reusable patterns before making visual decisions.',
    ],
    sources: [updateSources.brief],
  },
  {
    id: 'requested-variations',
    chapter: 'updates',
    kind: 'update',
    title: 'Three directions for the report',
    summary:
      'Simple, alternative cards/table treatments, and a clearer way to show what changed.',
    points: [
      'Simple: does the job and communicates clearly.',
      'Cards/table variations: consider company identity and logos as well as the arrangement of information. Confirm logo availability and provide a fallback.',
      'A more distinctive approach: help a returning reader see the differences in a new report. “Changes first” is our short name for this possible direction, not an approved final layout.',
      'The client’s success criteria are easy to scan, insightful, and interesting. Variations should test how people read information, not only decorative changes.',
      'The client is open to improving or restructuring returned data to support useful tables, graphs, or other visualizations. Explain the benefit and data dependency of each proposal.',
    ],
    sources: [updateSources.brief],
  },
  {
    id: 'scout-lessons',
    chapter: 'updates',
    kind: 'context',
    title: 'Learn from the Scout demo',
    summary:
      'Lead with what matters, explain relevance, and make the evidence easy to explore.',
    points: [
      'Around 00:05–00:20, the demo shows the Scout purpose, active status, schedule, last run, next run, and a summary of new matches.',
      'Around 00:25, company facts are followed by “Why 20VC fit” and timing. The reader can see why a result matters to them.',
      'Around 01:10, missed deals are grouped into previously unseen opportunities and connected opportunities that were not pursued. The grouping explains the numbers.',
      'Around 02:10, a natural-language input is used to refine the Scout’s preferences. Conversational customization and CRM integrations are not added v1 requirements.',
      'Our design interpretation: lead with changes, identify the relevant buyers and transactions, and then let the reader inspect sourced evidence. Use capability overlap only when it is actually available.',
      'Scout’s missed opportunities are different from the Exit Radar artifact’s internal nearMisses, which are deals excluded from the report window.',
    ],
    sources: [updateSources.video, updateSources.schema],
  },
  {
    id: 'supplied-report-reality',
    chapter: 'readiness',
    kind: 'snapshot',
    title: 'A full table can still have incomplete data',
    summary:
      'The client example has 45 corpus deals, six buyer cards, and 20 displayed transactions, with many missing fields.',
    points: [
      'The supplied VanZandt Controls/Eagle Automation report was generated on 21 September 2026 and uses a 24-month window. It shows 45 deals, Strategic 44%, and PE 56%. These are artifact values, not independently verified live metrics.',
      'The sourced table has 20 rows. Nineteen show n/d for value and five have no stated reason. One of the six buyer cards has no thesis.',
      'Several buyer and transaction explanations are long. Explore a readable summary with accessible detail without treating paraphrases as verbatim quotes.',
      'Six cards and twenty rows are upper bounds, not required amounts of content. Dense row counts do not imply complete fields.',
      'The HTML also includes Deals in space and Near-misses for operator context. The JSON note explicitly keeps these internal fields off the customer page.',
      'The VanZandt example and the fictional Acme Payroll JSON describe different companies. Do not merge them into one report.',
    ],
    sources: [updateSources.report, updateSources.schema],
  },
  {
    id: 'payload-guide',
    chapter: 'readiness',
    kind: 'snapshot',
    title: 'Read the data contract without inventing values',
    summary:
      'document holds report content. Internal fields stay internal, and missing values need an honest presentation.',
    points: [
      'run_metadata holds engine provenance and is never shown to users. document holds report content, but it also includes internal operator-only fields.',
      'stats can be null. Buyer IDs, buyer type, thesis, transaction date, acquirer identity, value, and stated reason can also be missing. Missing is not the same as zero.',
      'The schema lists overlapCapabilityIds / overlapCapabilityNames on cards and addedCapabilityIds / addedCapabilityNames on transactions. The latter are described as limited to capabilities held by the subject.',
      'The sample JSON is fictional Acme Payroll: four corpus deals, two buyer cards, one sourced row, and percentages totaling 75%. The Markdown is descriptive JSON/JSONC, not an executable application or a formal JSON Schema.',
      'dealsInSpace, nearMisses, nearMissesTotal, and run_metadata stay off the customer report. Internal near-miss reasons can contain machine codes.',
      'Dates may be partial or absent. Numeric values have no currency field in the supplied shape; confirm currency and units before formatting money.',
    ],
    sources: [updateSources.schema],
  },
  {
    id: 'implementation-readiness',
    chapter: 'readiness',
    kind: 'snapshot',
    title: 'Separate the requested behavior from API readiness',
    summary:
      'The JSON document records implementation gaps as of 21 September 2026; it does not remove those items from the brief.',
    points: [
      'Buyer cards lack a largest-disclosed-value field. A maximum taken from the twenty visible rows would not represent the full buyer corpus.',
      'The note says the server computes the next first-of-month refresh date, but the response does not include it yet. The UI must consume the actual schedule when available.',
      'The delta and Watch backend are described on an unmerged branch. Planned delta fields identify new buyers, new deal references, risen buyer counts, and quiet months.',
      'The report endpoint is described as admin-only at that time. Customer visibility requires the intended organization-scoped access.',
      'These are dated statements in a supplied document. No current branch, API, or deployment status has been independently verified here.',
      'For later design review, label dependencies and align implementation readiness with the release plan. Do not silently drop PRD requirements or claim the current API already supports them.',
    ],
    sources: [
      updateSources.schema,
      { doc: 'prd', page: 8, label: 'PRD · business rules' },
    ],
  },
  {
    id: 'overlap-and-reasons',
    chapter: 'readiness',
    kind: 'question',
    title: 'Clarify overlap and the meaning of a quote',
    summary:
      'The update and schema need reconciliation before the UI can make specific evidence claims.',
    points: [
      'The client message says overlapping capabilities are missing from the schema and still need to be added. The supplied Markdown already lists the fields. Ask whether the structure, population, or full intended meaning remains unfinished.',
      'Request a real example with populated overlap. It will show names, amounts, and the relationship between the subject and acquired capabilities.',
      'The schema describes thesis and statedReason as sourced quotes, while the HTML reads like summarized narrative. Confirm whether each field is verbatim or summarized before choosing quotation marks and attribution.',
      'The schema allows null stated reasons and buyer types. This confirms that the UI must handle absence, but does not settle final copy or buyer-card eligibility.',
    ],
    sources: [updateSources.brief, updateSources.schema, updateSources.report],
  },
  {
    id: 'next-evidence',
    chapter: 'readiness',
    kind: 'question',
    title: 'Collect the evidence that will make exploration concrete',
    summary:
      'Consecutive reports, populated overlap, and the actual payload would turn open questions into concrete design inputs.',
    points: [
      'Obtain the Paper link and inspect the shared tokens, Intelligence page, and prepared Exit Radar page when available.',
      'Request two consecutive reports for the same company and their delta. One report alone cannot demonstrate all three kinds of change.',
      'Request populated capability overlap and an actual report JSON payload. The fictional sample does not supply the VanZandt payload.',
      'Align the dated API gaps with the intended v1 release, including schedule, Watch, delta, and customer access.',
      'Carry forward the unanswered meaning of company space, missing-reason presentation, unclassified buyers, and whether the time-window fallback is re-evaluated after refresh.',
    ],
    sources: [updateSources.brief, updateSources.schema],
  },
];

export const clientUpdateLessons: Lesson[] = [
  {
    id: 'updates',
    question: 'What should make the report clear and useful?',
    answer:
      'Keep the existing Paper foundation and explore how people read the report: a simple presentation, alternative cards and tables, and a clearer view of what changed. The client’s goal is a report that is easy to scan, insightful, and interesting.',
    storyLabel: 'DESIGN BRIEF',
    storyNote: 'Shared design requests · supplied references',
    story: {
      title: 'A familiar foundation. A clearer report.',
      text: 'Paper provides the theme, navigation, tokens, and Intelligence patterns. The HTML shows an example of the report’s content, the JSON explains its data, and the Scout demo offers inspiration for summaries and relevance.',
    },
    essentials: [
      {
        title: 'Give every reference a role',
        text: 'Keep the PRD as the behavior contract, use Paper for the product’s visual foundation, read JSON and HTML for data reality, and treat Scout as inspiration.',
      },
      {
        title: 'Explore how readers find the signal',
        text: 'Compare a simple layout, cards/table alternatives, and a clearer view of changes. Each direction should help readers understand buyers, transactions, or new activity.',
      },
      {
        title: 'Connect visualization to data',
        text: 'The client is open to better data for useful tables and graphs. Explain what a proposed view helps the reader understand and which fields it needs.',
      },
    ],
    terms: [],
    details: [
      'design-principles',
      'new-materials',
      'paper-foundations',
      'requested-variations',
      'scout-lessons',
    ],
    quiz: {
      question: 'How should the supplied HTML guide the report design?',
      options: [
        'Copy its layout and every section as the final customer page.',
        'Use it to understand content, keep the Paper foundation, and explore clearer ways to present the report.',
        'Replace the existing theme with the Scout demo’s interface.',
      ],
      correct: 1,
      explanation:
        'The client calls the HTML an example and asks to retain the existing Paper theme and navigation. It is a source of content for exploration, alongside the PRD and data documentation.',
    },
  },
  {
    id: 'readiness',
    question: 'What does the supplied data actually support?',
    answer:
      'The new artifacts make missing data and implementation dependencies concrete. Read them as dated evidence, keep internal fields separate, and collect the examples needed to design changes and relevance honestly.',
    storyLabel: 'SUPPLIED CLIENT EXAMPLE',
    storyNote: 'VanZandt / Eagle Automation · generated 21 Sep 2026',
    story: {
      title: 'Many transactions. Many missing fields.',
      text: 'The HTML contains 45 corpus deals and displays 20 sourced transactions. Nineteen visible rows have no disclosed value, five have no stated reason, and one of the six buyer cards has no thesis. These are observations of the supplied artifact, not live metrics.',
    },
    essentials: [
      {
        title: 'Counts, completeness, and examples differ',
        text: 'Twenty displayed rows are a limited view of a 45-deal corpus. The Acme Payroll JSON is a separate fictional example. Neither should be mistaken for a complete, current API payload.',
      },
      {
        title: 'Readiness is dated',
        text: 'The 21 September note lists absent fields, unmerged changes, and admin-only access. Confirm current readiness later; these observations do not rewrite the product requirements.',
      },
      {
        title: 'Make the next questions specific',
        text: 'Ask for consecutive reports, populated overlap, an actual JSON payload, and clarification of quoted versus summarized reasons. These examples help make changes and relevance concrete.',
      },
    ],
    terms: ['Corpus', 'Delta', 'n/d'],
    details: [
      'supplied-report-reality',
      'payload-guide',
      'implementation-readiness',
      'overlap-and-reasons',
      'next-evidence',
    ],
    quiz: {
      question:
        'The supplied HTML includes “Near-misses.” Should it become a customer section inspired by Scout’s missed-deals feature?',
      options: [
        'Yes: both names describe the same customer feature.',
        'No: the schema marks these excluded deals as internal; Scout is a separate reference.',
        'Yes: every section in the example HTML is a required screen section.',
      ],
      correct: 1,
      explanation:
        'The HTML is an example with operator data. Internal nearMisses describe excluded deals and must stay off the customer page. The Scout demo does not change that contract.',
    },
  },
];
