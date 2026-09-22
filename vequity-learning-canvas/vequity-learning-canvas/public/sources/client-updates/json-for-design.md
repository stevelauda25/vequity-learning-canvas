# Exit Radar: report JSON for design

Prepared 2026-09-21 from the `development` branch. The source of truth is `Automations/agents-api-v2/agents_api_v2/matching/models/ma_intelligence_payload.py` (`ExitRadarPayload` / `ExitRadarDocument`, EPD-2433).

Read this together with the design starter and PRD on [EPD-2389](https://linear.app/vequity/issue/EPD-2389/ship-exit-radar-v1-monthly-who-is-buying-in-your-space-report). This file only describes the data. The brief describes the page.

---

## 1. Shape

Each report is stored as two parts. `run_metadata` holds engine provenance, which is never shown to users. `document` holds the report content. The identity keys use snake_case and the section keys use camelCase. The payload is rejected if it contains any key not listed here.

```jsonc
{
  "run_metadata": {
    "model": "string",
    "run_id": "string",
    "profile": "exit-radar-v1",
    "profile_hash": "string",
    "engine": "matching-v3",
    "corpus_snapshot": "string | null",
    "contract_version": "6"
  },
  "document": {
    "entity_id": "string",               // the company the report is about
    "entity_name": "string",
    "generated_at": "string",            // ISO timestamp, e.g. 2026-09-01T00:04:12Z
    "type": "exitRadar",
    "windowLabel": "24 months | 5 years",
    "insufficientPrecedent": false,      // true = thin report
    "caveat": "string | null",           // shown with a thin report
    "undatedCount": 0,                   // window deals with no date
    "nearMissesTotal": 0,                // INTERNAL (see §3)

    "stats": {                            // 3 stat tiles; can be null
      "dealCount": 0,                     // deals in the window
      "pctStrategic": 0,                  // whole number 0–100
      "pctPe": 0                          // whole number 0–100
    },

    "cards": [{                           // buyer cards, max 6, already ranked
      "entityId": "string | null",        // null = buyer can't be linked
      "name": "string",
      "dealCount": 0,
      "buyerType": "Strategic | PE | null",
      "overlapCapabilityIds": ["string"],
      "overlapCapabilityNames": ["string"],   // capabilities the subject ALSO holds
      "thesis": "string | null"           // buyer's stated reason, quoted from a source
    }],

    "transactions": [{                    // sourced deals table, max 20, newest first
      "dealRef": "string",
      "date": "string | null",
      "acquirerEntityId": "string | null",
      "acquirerName": "string | null",
      "targetName": "string",
      "value": 0,                         // integer or null → show "n/d"
      "statedReason": "string | null",    // quote from the source
      "sourceUrl": "string",              // always present
      "addedCapabilityIds": ["string"],
      "addedCapabilityNames": ["string"]  // limited to capabilities the subject holds
    }],

    "dealsInSpace": [ /* INTERNAL (see §3) */ ],
    "nearMisses":   [ /* INTERNAL (see §3) */ ]
  }
}
```

### Planned addition: "what's changed" (not on `development` yet)

Blake's open branch `epd-2437-exit-radar-watch-backend` adds this to `document` on each monthly refresh:

```jsonc
"delta": {
  "newBuyerNames": ["string"],
  "newDealRefs": ["string"],            // mostly "date|buyer|target" keys, not real deal ids
  "risenBuyerCounts": [{ "name": "string", "from": 1, "to": 3 }],
  "quietMonth": true                    // nothing new this month
}
```

---

## 2. Illustrative examples (fictional data)

### Sparse: the normal case

```json
{
  "entity_id": "…",
  "entity_name": "Acme Payroll",
  "generated_at": "2026-09-01T00:04:12Z",
  "type": "exitRadar",
  "windowLabel": "5 years",
  "insufficientPrecedent": false,
  "caveat": null,
  "undatedCount": 1,
  "nearMissesTotal": 3,
  "stats": { "dealCount": 4, "pctStrategic": 50, "pctPe": 25 },
  "cards": [
    { "entityId": "…", "name": "Northwind Holdings", "dealCount": 2, "buyerType": "Strategic",
      "overlapCapabilityIds": [], "overlapCapabilityNames": [], "thesis": null },
    { "entityId": null, "name": "Harbor Capital", "dealCount": 1, "buyerType": "PE",
      "overlapCapabilityIds": [], "overlapCapabilityNames": [],
      "thesis": "Expands our platform into mid-market HR services." }
  ],
  "transactions": [
    { "dealRef": "epa:…", "date": "2025-03", "acquirerEntityId": null, "acquirerName": "Harbor Capital",
      "targetName": "PayBridge", "value": null,
      "statedReason": "Expands our platform into mid-market HR services.",
      "sourceUrl": "https://example.com/press-release",
      "addedCapabilityIds": [], "addedCapabilityNames": [] }
  ],
  "dealsInSpace": [],
  "nearMisses": []
}
```

Compare this example with the tile values. There are 4 deals but only 1 sourced transaction row. The percentages add up to 75 because 1 buyer is unclassified. Most fields are empty or null.

### Dense: the upper limit

Up to 6 cards and up to 20 rows. Cards have overlap chips, values, and theses. This matches the reference mock on EPD-2389.

---

## 3. Internal fields: keep off the customer page

- `dealsInSpace`: every deal in the window, including deals without a source. It's used for operator checks.
- `nearMisses` / `nearMissesTotal`: deals excluded from the window. `reason` holds machine codes such as `outside-24-month-window`.
- `run_metadata`: all engine provenance.

---

## 4. Brief items the data doesn't support yet

Confirm each of these with Blake (engineering) before designing it in.

1. **Largest disclosed value on buyer cards.** Cards have no value field.
2. **Next-update date.** The server computes it (the next 1st of the month), but the API response doesn't include it yet.
3. **"What's changed" (`delta`).** It's on an unmerged branch.
4. **"Watch this space".** The backend API exists on the same branch. No button exists yet. The current "Let me know when available" button only saves to the browser.
5. **Customer access.** The report endpoint is Admin-only today.
