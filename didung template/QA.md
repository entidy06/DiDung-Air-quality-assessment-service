# Verification record

The browser results below describe the previous published khí. version. The DiDung brand and clearer sun/sky revision passed syntax/model checks but has not received browser QA or deployment: source synchronization was blocked by the current environment policy.

Date: 18 October 2026 (ICT).

## Automated model checks

`node --test tests/model.test.mjs`: 4/4 passing.

- US AQI boundaries: 0, 50, 51, 100, 101, 150, 151, 200, 201, 300, 301, 500.
- Missing, invalid, negative, non-integer and out-of-range values return no category.
- Vietnamese search accepts accents/case/ASCII equivalents and rejects unknown locations.
- Every scenario has 24 unique hourly samples, bounded 0–500, ending at the selected reading.

`node --check dist/app.js` and `node --check dist/model.js`: passing.

## Browser checks on the private HTTPS deployment

- Desktop 1440 × 1000: all six scenarios return the expected reading, category, a single active state, 24 table rows and four forecast rows. No horizontal page overflow.
- Missing mode: the reading and all six concentrations become dashes; no scenario is selected; history and forecast are unavailable. Retry restores the selected demo value.
- An unknown search query shows the empty result message. `thao dien` selects Thảo Điền through Arrow Down + Enter and changes the reading to 64.
- Alert configuration is per location. Setting threshold 101 for Thảo Điền and selecting US AQI 176 produces the explicit demo threshold warning. Choosing Good clears the old warning. No browser notification permissions are requested.
- The 24-hour data table opens and contains 24 rows.
- Selecting the Tân Định map marker changes the main location to Tân Định and AQI to 112; keyboard focus remains on the refreshed marker.
- Initial mobile review at 390 × 844 found the plant overlapping the reading. The responsive layout was changed to reserve space below the data; longer desktop scenario headlines were also reduced to retain space for the specimen.

## Limits

No live data provider, external map tiles, server notification delivery, real forecast model or production sensor integration exists. Native Sites deployment success verifies publication, not scientific accuracy. System fonts avoid external font dependencies. Browser QA uses the app's Chromium browser; physical-device, Safari/Firefox and formal screen-reader/contrast audits are outside this prototype verification.
