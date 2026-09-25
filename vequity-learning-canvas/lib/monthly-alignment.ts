import type { Card, Source } from './knowledge';

export const monthlyAlignmentSource: Source = {
  doc: 'reference',
  label: 'Monthly publication · client message & design proposals · 25 Sep 2026',
  url: '/sources/client-updates/monthly-alignment.html',
};

export const monthlyAlignmentCards: Card[] = [
  {
    id: 'monthly-publication', chapter: 'delivery', kind: 'update',
    title: 'A new edition on the 1st',
    summary: 'A calendar-month release, with a report ready before its notification.',
    points: [
      'Steve’s client update says reports are generated/sent on the first day of every month. The 21 September JSON note also names the next first of the month.',
      'Design interpretation: use the 1st as the publication date and send the notification after the report can be opened. No particular publication hour is promised.',
      'Recommended first-report flow: an operator makes the initial report available when ready; recurring releases then follow the 1st. This preserves the PRD’s initial quality gate.',
      'Illustrative journey: initial report on 15 August → monthly edition on 1 September → next update on 1 October. The shorter first interval is intentional.',
      'Publication frequency and data coverage are separate: retain the 24-month window and the existing 5-year initial fallback. Changes compare with the previous run.',
      'Company Home and both own-company and portfolio-company entry points open the latest available report. Watch remains personal to each user and company.',
    ],
    sources: [monthlyAlignmentSource, { doc: 'reference', label: 'JSON for Design · §4', url: '/sources/client-updates/json-for-design.html' }, { doc: 'prd', page: 8, label: 'PRD · V.1 / V.3' }],
  },
  {
    id: 'publication-timezone', chapter: 'delivery', kind: 'proposal',
    title: 'One shared edition, local timestamps',
    summary: 'Proposed: organization publication time; user-local timestamp display.',
    points: [
      'Use a stable organization time zone for report publication. A travelling member does not change the shared report schedule.',
      'Display actual update timestamps in the user’s account/device time zone, with the zone identified. The same instant may have a different local calendar date.',
      'Keep edition labels such as September 2026 tied to the published edition; they do not change with the viewer’s location.',
      'A next-update calendar date with no scheduled time cannot be converted to another zone. In these date-only mockups, explicitly label it as the organization’s schedule.',
      'The backend remains the source of the next update and any retry date. Localized formatting does not calculate or change that schedule.',
      'These are design proposals, not timezone rules specified by the PRD. An exact publication hour and per-user morning email delivery are not committed.',
    ],
    sources: [monthlyAlignmentSource, { doc: 'prd', page: 9, label: 'PRD · V.6' }],
  },
  {
    id: 'report-history', chapter: 'report', kind: 'proposal',
    title: 'Revisit a previous edition',
    summary: 'Proposed scope addition: a report-edition selector and a clear return to latest.',
    points: [
      'Open the latest available report by default. Let members select an earlier edition for the same company and show a Previous edition label.',
      'An earlier edition keeps its original statistics, buyers, transactions and change baseline. Do not rebuild an old report from current data.',
      'Offer View latest report. Keep the live next-update schedule on the latest edition; an archived report must not present its old next date as a current promise.',
      'Watch belongs to the user and company, so changing editions must not create another subscription or change the current Watch state.',
      'Only existing editions appear. A company with one report has no earlier report to browse. Existing organization permissions also apply to history.',
      'The PRD requires retained history after corrective reruns but specifies a latest-report page. Customer-facing history is our proposed extension, not a previously committed v1 feature.',
    ],
    sources: [monthlyAlignmentSource, { doc: 'prd', page: 11, label: 'PRD · VII' }, { doc: 'prd', page: 14, label: 'PRD · XI' }],
  },
];
