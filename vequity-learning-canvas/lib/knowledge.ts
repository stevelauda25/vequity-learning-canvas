import { clientUpdateCards } from './client-updates.ts';
import { monthlyAlignmentCards, monthlyAlignmentSource } from './monthly-alignment.ts';
export type Source = { doc: 'prd' | 'starter'; page: number; label: string; url?: never } | { doc: 'reference'; label: string; url: string; page?: never };
export type Card = { id: string; chapter: string; title: string; summary: string; kind?: 'requirement' | 'proposal' | 'question' | 'context' | 'update' | 'snapshot'; points: string[]; sources: Source[] };
export const cardKindLabel = (kind: Card['kind']) => ({ requirement: 'Product requirement', proposal: 'Design proposal', question: 'Review observation', context: 'Document context', update: 'Client direction', snapshot: 'Dated evidence' })[kind || 'requirement'];
const prd = (page: number, label: string): Source => ({ doc: 'prd', page, label: `PRD · ${label}` });
const starter = (page: number): Source => ({ doc: 'starter', page, label: `Design Starter · p. ${page}` });
export const chapters = [
 { id:'overview', title:'The big picture', kicker:'START HERE', subtitle:'A monthly view of your buyer landscape', x:80,y:80,w:1080,h:920, takeaway:'Exit Radar turns public acquisition evidence into a monthly picture of who buys companies like yours.' },
 { id:'people', title:'Who it’s for', kicker:'THE PEOPLE', subtitle:'Two contexts. The same report structure.',x:1390,y:80,w:1080,h:740, takeaway:'A strategic company looks at itself. An investment firm looks at a portfolio company. Access always stays inside the organization.' },
 { id:'journey', title:'The user journey', kicker:'CONNECT THE DOTS',subtitle:'From first visit to a monthly habit',x:80,y:1090,w:1080,h:760,takeaway:'An operator prepares the first report. Members explore it, optionally watch it, and return when the report refreshes.' },
 { id:'report',title:'Anatomy of the report',kicker:'THE EXPERIENCE',subtitle:'Five questions, answered through one page',x:1390,y:1090,w:1080,h:760,takeaway:'The page combines a header, three statistics, up to six buyers, up to twenty sourced transactions, and visible changes after refresh.' },
 { id:'rules',title:'Rules & evidence',kicker:'THE PRODUCT CONTRACT',subtitle:'The details that keep the report trustworthy',x:80,y:2120,w:1080,h:920,takeaway:'Use the full deal corpus for counts, sourced rows for the table, and real evidence for every capability. Missing data stays missing.' },
 { id:'states',title:'Wireframes & states',kicker:'MAKE IT TANGIBLE',subtitle:'Explore the report in real-world conditions',x:1390,y:2120,w:1080,h:920,takeaway:'Sparse is the default. Loading, no report, an extended window, and a quiet month each need a clear, intentional experience.' },
 { id:'delivery',title:'Refresh & notifications',kicker:'THE RETURN LOOP',subtitle:'Monthly reports. Personal subscriptions.',x:80,y:3310,w:1080,h:820,takeaway:'Every generated report refreshes monthly. Only watchers receive the email. A failed refresh preserves the last good report and moves the next date.' },
 { id:'scope',title:'Scope & decisions',kicker:'KEEP THE BOUNDARIES CLEAR',subtitle:'What ships, what is proposed, and what comes later',x:1390,y:3310,w:1080,h:820,takeaway:'Build the evidence-led report first. Watch interactions and change presentation are design decisions; broader automation and guidance are future work.' },
 { id:'updates',title:'Design direction',kicker:'SHAPE THE REPORT',subtitle:'Visual foundations, exploration directions, and inspiration',x:80,y:4490,w:1080,h:1050,takeaway:'Keep the Paper foundation and explore simple, cards/table, and changes-first presentations. Make the report easy to scan, insightful, and interesting.' },
 { id:'readiness',title:'Report & data',kicker:'EXPLORE THE SOURCE MATERIAL',subtitle:'The rendered report, JSON structure, and data dependencies',x:1390,y:4490,w:1080,h:1050,takeaway:'Use the supplied report to understand missing data, the schema to track dependencies, and consecutive reports to prepare a truthful view of changes.' },
];
export const cards: Card[] = [
 ...clientUpdateCards,
 ...monthlyAlignmentCards,
 {id:'concept',chapter:'overview',title:'Know who’s buying. Understand why.',summary:'A monthly, evidence-led report of the companies acquiring businesses like yours.',kind:'requirement',points:[
 'Exit Radar v1 is a feature in the existing Vequity Intelligence area. It replaces the Coming soon page and connects the Company Home card to the live report.',
 'The core promise: who is buying in a company’s space, why those acquisitions happened, and what changed since the previous monthly report.',
 'The buyer-direction intelligence engine already exists internally and is operator-run. This feature makes its output usable by existing customers.',
 'The immediate business driver is customer commitments and sales demos. The PRD names no hard calendar deadline.',
 'The learning canvas visualizes the feature specification. All interactive report figures are clearly labeled fictional examples.'
 ],sources:[starter(1),prd(2,'I'),prd(3,'I'),prd(14,'Appendix')]},
 {id:'evidence',chapter:'overview',title:'Evidence over guesswork',summary:'Sourced transactions. Real capabilities. No invented reasons or signals.',kind:'requirement',points:[
 'Every transaction row must have a working recorded source link. Unsourced deals may contribute to corpus counts but cannot appear in the table.',
 'Capability chips appear only when a capability is actually derived. A missing chip is an honest absence of evidence, not a UI defect.',
 'Buyer cards and their theses use only the public transaction corpus. Other firms’ private acquisition criteria, mandates, and activity are never inputs.',
 'The product differentiates on sourced stated reasons and capability overlap. Generic headcount, funding, or web-traffic signals do not replace that evidence.'
 ],sources:[prd(9,'V.5 / V.8'),prd(12,'VIII'),prd(13,'Direction')]},
 {id:'two-views',chapter:'overview',title:'Two views, one report',summary:'A strategic company views itself. An investment firm views a portfolio company.',points:[
 'Existing buyer-role members of Intelligence-enabled organizations are the v1 audience.',
 'Strategic persona: a company such as Inspira Financial opens its own Exit Radar from Intelligence.',
 'Investment persona: a firm such as Saturn Five opens Exit Radar on a portfolio company (portco).',
 'Both surfaces share the same page structure in v1. There is no new self-serve business-owner signup.'
 ],sources:[prd(2,'I'),prd(8,'IV · Set 4')]},
 {id:'return',chapter:'overview',title:'A reason to return',summary:'Monthly updates reveal new deals, new buyers, and increasing activity.',points:[
 'A returning user can identify new sourced transactions, buyers new to the displayed buyer list, and buyers whose deal counts increased.',
 'Compare each refresh with the previous run, not with the user’s last visit.',
 'The first report has no previous baseline and therefore no change summary.',
 'A quiet month still communicates that a refresh happened and no new activity was found.'
 ],sources:[prd(9,'V.9')]},
 {id:'strategic',chapter:'people',title:'The strategic company',summary:'“Who is buying businesses like ours?”',points:[
 'Example in the PRD: Inspira Financial, an Intelligence-onboarded strategic company.',
 'Entry point: Intelligence sidebar → Exit Radar. The Exit Radar card on Company Home also leads to the report.',
 'The report’s subject is the organization itself. Highlighted capabilities are capabilities the subject holds that those buyers acquire. The PRD specifies green; this wireframe uses checked blue chips.',
 'An active member can view the report and Watch for their own email notifications.'
 ],sources:[prd(2,'I'),prd(3,'I'),prd(10,'VI · Fixture 1')]},
 {id:'investment',chapter:'people',title:'The investment firm',summary:'“Who is buying in this portfolio company’s space?”',points:[
 'Example in the PRD: Saturn Five Demo, an Intelligence-onboarded investment firm.',
 'Entry point: portfolio company → Exit Radar. The report’s subject is that portfolio company, not the investment firm itself.',
 'A member can access every portco report available within the organization’s existing Intelligence permissions.',
 'Watch is per user per company. Watching one portco does not subscribe the user to every portfolio company.'
 ],sources:[prd(8,'IV · Set 4'),prd(10,'VI · Fixture 2'),prd(11,'VIII')]},
 {id:'access',chapter:'people',title:'The organization is the boundary',summary:'Existing Intelligence permissions apply to both surfaces.',kind:'requirement',points:[
 'Allowed: active members of the subject’s Intelligence-enabled organization.',
 'Not allowed: members of another buyer organization, advisors, or unauthenticated visitors.',
 'Private validated mandates, criteria, and platform activity from another firm must never influence this report.',
 'Production fixtures were verified on September 14, 2026. Equivalent Test fixtures were not verified in the PRD.'
 ],sources:[prd(10,'VI'),prd(11,'VIII'),prd(12,'VIII')]},
 {id:'first-report',chapter:'journey',title:'The first report starts with an operator',summary:'A human-triggered report is the v1 quality gate.',kind:'requirement',points:[
 'Completing Intelligence onboarding does not automatically create the first Exit Radar report in v1.',
 'Until the report exists, show a being prepared placeholder. Do not show an error or the old Coming soon marketing card.',
 'The placeholder must not promise a specific arrival date. Its exact wording belongs to design.',
 'The operator-triggered first report provides quality control before customers see the generated content. Monthly cadence starts after a report exists.'
 ],sources:[prd(9,'V.7'),prd(12,'IX'),prd(14,'XI')]},
 {id:'journey-flow',chapter:'journey',title:'Explore → Watch → Return',summary:'An evidence-led experience with a simple monthly return loop.',points:[
 '1. Open Exit Radar from Intelligence or a portco. Show loading while the report is being fetched.',
 '2. No report yet: show being prepared. Report exists: display the latest successful version.',
 '3. Read the statistics, buyer cards, and recent transactions. Follow a source to inspect the public evidence.',
 '4. Optionally select Watch this space. This opts the current user into this company’s refresh emails.',
 '5. On the 1st of each month the report refreshes. The watcher email links back to the page and leads with the same change headline.',
 '6. On return, show new transactions, new buyers, and increased buyer deal counts. Quiet months remain visible.'
 ],sources:[prd(2,'I'),prd(8,'V.3'),prd(9,'V.9')]},
 {id:'report-header',chapter:'report',title:'01 · Header & orientation',summary:'Name the subject, explain the data, and show the next update.',points:[
 'Title: Who is buying in {company}’s space.',
 'The subtitle explains the actual reporting window, the capability-overlap marker (green in the PRD; checked blue chips in this wireframe), and that buyer deal counts come from the full corpus rather than only displayed rows.',
 'Show the next-update date supplied by the schedule’s system of record. Do not calculate it on the client.',
 'Offer Watch this space. Ignore the reference mock’s top-right toggle and since 2025 phrasing.'
 ],sources:[prd(2,'Design brief'),prd(6,'IV · Set 1'),prd(9,'V.5 / V.6')]},
 {id:'report-stats',chapter:'report',title:'02 · Three statistics',summary:'Deal count · Strategic share · PE share',points:[
 'Exactly three tiles: total deals in the actual report window, % strategic acquirers, and % PE/investment acquirers.',
 'All percentages use every deal in the report window as the denominator, including unclassified acquirers.',
 'The two percentages can total less than 100%. The remaining share is unclassified and is not displayed as a fourth tile.',
 'Worked fictional example: 40 deals, 24 strategic, 12 PE, and 4 unclassified → 60% strategic and 30% PE.'
 ],sources:[prd(7,'IV · Set 2'),prd(8,'V.2')]},
 {id:'report-buyers',chapter:'report',title:'03 · Most active buyers',summary:'At most six cards, ordered by activity and relevance.',points:[
 'Each card contains buyer name, Strategic or PE label, deal count, largest disclosed deal value, real capability chips, and a one-line buying thesis.',
 'Rank by deal count first, then capability overlap with the subject, then most recent deal.',
 'The PRD specifies green chips for capabilities the subject holds that the buyer acquires. This design uses checked blue chips for overlap; other evidenced chips use a pale neutral fill.',
 'Strategic and PE buyers share the same section and card format. PE gets the same freeform thesis, not a special platform/add-on framing.',
 'Counts use the full deal corpus. Do not infer buyer activity from only the capped transaction table.'
 ],sources:[prd(4,'II · AC 3'),prd(6,'IV · Set 1'),prd(8,'V.4')]},
 {id:'report-transactions',chapter:'report',title:'04 · Recent transactions',summary:'Up to twenty sourced rows, newest first.',points:[
 'Columns: date, buyer → target, capabilities added, disclosed value, stated reason quote, and source link.',
 'Show only transactions with a working recorded source. Limit the table to the twenty most recent sourced rows.',
 'Show n/d when the value is not disclosed. Capability chips can be absent.',
 'The PRD asks for a quoted reason, but says only about 35–50% of deals have one. The policy for a sourced deal without a stated reason needs PO clarification.',
 'The interactive wireframes use fictional companies, dates, values, and quoted text. Their Sample source buttons open a labeled sample, not a purported real press release.'
 ],sources:[prd(7,'IV · Set 1'),prd(9,'V.5 / V.8'),prd(15,'Data-reality notes')]},
 {id:'report-delta',chapter:'report',title:'05 · What’s changed',summary:'Show what is new without asking users to compare reports.',points:[
 'Required after the first report: new sourced transactions, buyers new to the buyer list, and existing buyers whose deal counts increased.',
 'The initial report has no baseline and no delta. A quiet month explicitly says no new activity since the previous refresh.',
 'The refresh email leads with the same change headline as the page.',
 'Design proposal in these wireframes: a summary strip under the statistics, plus New and +n deals labels on relevant cards and rows. Placement is delegated to design.',
 'A separate section or integration into the buyer/transaction sections is allowed. Four structural sections and the fifth delta requirement are therefore compatible.'
 ],sources:[prd(7,'IV · Set 1'),prd(9,'V.9')]},
 {id:'window',chapter:'rules',title:'24 months → 5 years',summary:'Fewer than 10 deals in the initial window triggers the wider report.',kind:'requirement',points:[
 'Publication frequency is separate from the analysis window. The initial report looks back 24 months. If the space contains fewer than 10 deals in that window, build it over the last five years instead.',
 'The deal-count tile must name the window actually used. The extended window must never be silent.',
 'Ten deals exactly does not trigger fallback. Count the corpus, not only sourced rows in the table.',
 'Clarification for implementation: the PRD defines the initial fallback but does not explicitly say whether subsequent refreshes re-evaluate the window.'
 ],sources:[prd(8,'V.1'),starter(2)]},
 {id:'counts',chapter:'rules',title:'The corpus is bigger than the table',summary:'Full-corpus counts and sourced-row evidence serve different purposes.',kind:'requirement',points:[
 'The full space corpus supplies the total deal count, both percentage denominators, and buyer-card deal counts.',
 'The table is a bounded evidence view: only sourced transactions, at most twenty, most recent first.',
 'A buyer with twelve acquisitions might have only two visible rows. This is allowed and must be explained in the subtitle.',
 'Fictional arithmetic: 24 strategic + 12 PE + 4 unclassified = 40 total; 24/40 = 60%, 12/40 = 30%. Do not normalize those percentages to 100%.'
 ],sources:[prd(8,'V.2'),prd(9,'V.5')]},
 {id:'chips',chapter:'rules',title:'A chip is a claim',summary:'Only render capabilities supported by actual derivation.',kind:'requirement',points:[
 'Applies to both buyer cards and transaction rows. No guessed capabilities may be shown as data.',
 'Historical deal-level capability coverage was near zero before September 2026 because the columns were new and unbackfilled.',
 'The engineering team chooses the derivation method. The PO ratifies it on a sample during PR review.',
 'Design sparse states with chip-less rows from the outset. Never fill gaps just to make the layout look complete.'
 ],sources:[prd(9,'V.8'),prd(15,'Data-reality notes')]},
 {id:'ranking',chapter:'rules',title:'Activity first. Then relevance.',summary:'Deal count → capability overlap → most recent deal.',kind:'requirement',points:[
 'Show at most six buyers. Sort by deal count in the space, descending.',
 'Break count ties using capability overlap with the subject, then the most recent deal.',
 'Mix Strategic and PE buyers in one ordered section, with each buyer’s type labeled.',
 'The corpus may include unclassified acquirers, but the PRD does not state whether they are eligible for cards or what their card label would be. Keep this as a clarification, not an invented rule.'
 ],sources:[prd(8,'V.2 / V.4')]},
 {id:'data-reality',chapter:'rules',title:'Sparse is the real product',summary:'The dense mock is a ceiling, not the typical experience.',kind:'context',points:[
 'PRD production snapshot, verified September 14, 2026: about 34k deals in 2024, 25k in 2025, and 11k in 2026 year to date.',
 'Only about 35–50% have a stated strategic rationale, and fewer than 1% have a disclosed value.',
 'Deal-level capability tags were near zero before September 2026. Roughly one in eight recent deals had a PE/investment acquirer.',
 'There were three Intelligence-onboarded production organizations in the snapshot. These are historical document facts, not live metrics.',
 'A realistic thin space might show just one buyer and two transaction rows. A quiet month still represents a successful report.'
 ],sources:[prd(2,'Design brief'),prd(15,'Data-reality notes')]},
 {id:'states-overview',chapter:'states',title:'Design every state deliberately',summary:'Loading, preparing, sparse, dense, five-year fallback, and quiet month.',kind:'requirement',points:[
 'Loading: clearly show that data is being fetched, without implying the report is missing.',
 'Being prepared: no report exists yet. Use calm copy, no error language, no promised delivery date.',
 'Sparse ready: few cards and rows, absent chips, and n/d values. This is the first design priority.',
 'Dense ready: up to six cards and twenty sourced rows. Do not treat rich data as a baseline.',
 'Five-year fallback: label the widened reporting window, especially in the deal-count tile.',
 'Quiet month: keep the report and explicitly show that no new activity was found since the last refresh. The email agrees.',
 'Initial report: no delta because no baseline exists. Failed refresh: preserve the last good report, move the next-update date, and show no member-facing error banner.'
 ],sources:[starter(2),prd(2,'Design brief'),prd(9,'V.6 / V.7 / V.9')]},
 {id:'watch-design',chapter:'states',title:'Watch interaction',summary:'Proposed: a reversible Watching button with immediate confirmation.',kind:'proposal',points:[
 'Required behavior: Watch subscribes the current user to this company’s monthly refresh email.',
 'Proposed UI: Watch this space becomes Watching, with inline confirmation explaining the monthly cadence.',
 'Proposed Unwatch: selecting Watching removes the subscription and confirms that future refresh emails will stop.',
 'The PRD deliberately delegates watched appearance, subscription confirmation, and whether Unwatch exists to design.',
 'The prototype simulates the interaction locally. It sends no emails and does not create a production subscription.'
 ],sources:[prd(2,'Design brief'),prd(8,'V.3')]},
 {id:'schedule',chapter:'delivery',title:'The next date is a promise',summary:'The schedule supplies the date. The page reflects it.',kind:'requirement',points:[
 'Every company with a generated report refreshes on the 1st of each month, even if no member has clicked Watch. The first-of-month date is confirmed by the client update.',
 'The header’s next-update date comes from the system of record for scheduling. It must never be computed client-side.',
 'On failure, retain the last good report and its date. Move the next-update date to the retry; do not leave a past promise or show an error banner.',
 'An operator rerun must be able to repair incorrect data by superseding the displayed report without deleting history.'
 ],sources:[monthlyAlignmentSource,prd(8,'V.3'),prd(9,'V.6'),prd(11,'VII'),prd(14,'XI')]},
 {id:'email',chapter:'delivery',title:'One email, two outcomes',summary:'Activity headline or quiet-month confirmation, always linking back.',kind:'requirement',points:[
 'Only users who opted in on that company’s report receive the refresh notification. Non-watchers receive nothing.',
 'Active month example: 3 new deals, 1 new buyer in your space. It must match the page’s change headline.',
 'Quiet month: say there was no new activity and name the next check date.',
 'The email is a notification with a page link, not the full report body.',
 'A missed email must not prevent subsequent emails. Page correctness is independent of email delivery. Retry behavior is delegated to engineering, with PO ratification.'
 ],sources:[prd(7,'IV · Set 3'),prd(8,'V.3'),prd(11,'VII · 6'),prd(12,'IX')]},
 {id:'engineering-direction',chapter:'delivery',title:'A useful seam for the future',summary:'Proposed direction: scheduled generation with persisted snapshots.',kind:'context',points:[
 'The PO recommends starting with scheduled runs, but this is direction for engineering triage, not a v1 architecture requirement.',
 'Persist the set of deals in the company’s space for each run. Compute changes by comparing snapshots.',
 'A future event-driven producer could update membership as deals arrive, while the page and email keep consuming the same change model.',
 'The earlier PRD’s hypothetical 400 reports ≈ 13 runs/day is an averaged planning example. A common first-of-month publication date concentrates the delivery workload; the average does not specify the new release schedule.',
 'These scale figures are planning scenarios from the PRD, not today’s deployment scale.'
 ],sources:[prd(12,'Direction'),prd(13,'Direction')]},
 {id:'in-scope',chapter:'scope',title:'What ships in v1',summary:'Two report surfaces, monthly refresh, per-user Watch, one email.',kind:'requirement',points:[
 'Own-company and per-portco Exit Radar; Company Home points to the real report.',
 'Header, exactly three statistics, up to six buyer cards, up to twenty sourced rows, and visible change information.',
 'Operator-triggered initial reports, then a monthly schedule with a truthful next-update date.',
 'Per-user, per-company Watch with a notification email on every refresh, including quiet months.',
 'Existing organization-scoped Intelligence permissions and public-corpus-only buyer evidence.'
 ],sources:[prd(6,'IV'),prd(7,'IV'),prd(8,'IV / V.3')]},
 {id:'non-goals',chapter:'scope',title:'Outside v1',summary:'Keep the first version focused on a trusted core report.',kind:'context',points:[
 'No self-serve business-owner signup or automatic first report at onboarding.',
 'No cadence chooser: monthly is fixed, while implementation should leave room for future configuration.',
 'No positioning guidance or full report body in email.',
 'No organization-wide notification management or per-organization kill switch.',
 'No special PE platform/add-on card framing.',
 'Future possibilities: guidance and action paths, persona-specific emphasis, self-serve owners, and event-driven alerts. These are not v1 requirements.'
 ],sources:[prd(12,'IX'),prd(13,'Direction')]},
 {id:'open-questions',chapter:'scope',title:'Clarifications to carry forward',summary:'Small semantic gaps to resolve without blocking the learning canvas.',kind:'question',points:[
 'Missing reason: what should happen when a transaction has a valid source but no explicit acquisition-reason quote? The wireframe labels this gap rather than inventing a policy.',
 'Unclassified acquirers: they count toward the denominator, but should they appear as buyer cards, and if so under which label?',
 'Fallback over time: is the 24-month versus five-year window re-evaluated at each monthly refresh?',
 'Definition of space: the existing engine determines relevance, but the user-facing explanation and examples are not defined in these documents.',
 'Reference mock: EPD-2389 is pending. The wireframes here are PRD-based proposals and do not claim to match it.',
 'PRODUCT-X explicitly lists no blocking open decisions. These are review observations, not newly asserted product blockers.'
 ],sources:[prd(8,'V.1 / V.2 / V.4'),prd(9,'V.5'),prd(14,'X'),prd(15,'Data-reality notes')]},
 {id:'rollout',chapter:'scope',title:'Trust is the release criterion',summary:'A wrong buyer, broken source, or overdue date damages credibility.',kind:'context',points:[
 'The PRD’s production snapshot includes three Intelligence organizations and watcher inboxes.',
 'A fabricated-looking thesis or wrong buyer in a customer demo is the key business risk.',
 'Operator-triggered first reports are the quality gate; the PO declined a separate kill switch.',
 'Wrong data must be repairable by an operator rerun that supersedes the report while preserving history.',
 'Domain contact listed in the PRD: Ryan Westlake. No hard deadline or effort cap is stated.'
 ],sources:[prd(14,'XI / Appendix'),prd(15,'Appendix')]},
];
export const acceptance = [
 'Own-company report shows header, stats, buyers, and transactions; no Coming soon badge.',
 'Exactly three tiles use the full-window denominator; Strategic + PE may be below 100%.',
 'At most six complete buyer cards follow count → overlap → recency ranking.',
 'Every visible transaction has a working source; at most twenty rows; missing values use n/d.',
 'Under ten deals in the initial 24-month corpus triggers a labeled five-year window.',
 'Only watchers get the refresh email, including quiet months.',
 'No existing report shows being prepared, without an error or promised date.',
 'The investment firm’s portco report uses the same report structure.',
 'The displayed next-update date is honored or moved to a retry after failure.',
 'Page and email agree on changes: new transactions, new buyers, and increased buyer deal counts.',
];
export const glossary = [
 ['Space','The relevant acquisition landscape around the subject company, as determined by the existing intelligence engine.'],
 ['Subject','The company the report is about: your own company or one portfolio company.'],
 ['Strategic buyer','An operating company acquiring another business.'],
 ['PE / investment buyer','A private-equity or investment acquirer.'],
 ['Portco','A portfolio company owned or backed by an investment firm.'],
 ['Corpus','The full set of deals used for the report’s space and time window.'],
 ['Capability','An evidenced business function or capability a deal adds. The PRD marks subject overlap in green; this wireframe marks it with a checked blue chip.'],
 ['Delta','Changes between the current report and the previous run, not since a user’s last visit.'],
 ['n/d','Not disclosed: a transaction value is unavailable.'],
 ['Buying thesis','A one-line summary of a buyer’s acquisition pattern, grounded in public transaction evidence.'],
];
export const sourceUrl = (source: Source) => source.doc === 'reference' ? source.url : `/sources/${source.doc === 'prd' ? 'prd' : 'design-starter'}.pdf#page=${source.page}`;
export const getCard = (id: string) => cards.find(card => card.id === id)!;
