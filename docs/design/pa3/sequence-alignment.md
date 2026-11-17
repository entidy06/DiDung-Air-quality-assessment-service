# Alignment with the existing PA3 section 4.4

Parent agent exported the current Google Doc as HTML through the authenticated
browser on 16 November 2026 and visually inspected all four sequence images.
The source export and extracted original PNGs are backed up outside the repo at
`~/.local/state/codex-loop/pa3-2026-11-16/pa3-before.html` and `sequence-1.png`
through `sequence-4.png`. Other members' section 4.4 was not edited.

| Sequence | Existing participants | Existing message vocabulary |
|---|---|---|
| UC-01 | User, View, AQ VM, AQ API, Auth, Database | read(); getCurrent(locationId); getUser(); readCurrent(locationId, now); isOld(validAt) |
| UC-06 | User, View, Threshold VM, Threshold API, Auth, Database | save(); create(input); getUser(); insertThreshold(userId, input); list(scope) |
| UC-08 | Scheduler, SyncAPI, OpenMeteoAdapter, Database | run(request, cron secret); readActiveLocations(); fetchAirQuality(locations) / fetchWeather(locations); appendSyncLog(attempt); upsertAir(rows) / upsertWeather(rows) |
| UC-11 | Scheduler, AlertJobAPI, Database | evaluate-alerts(cron secret); readActiveThresholds(); readEligibleAir(locations, now-3h, now); upsertNotifications(candidates); appendSyncLog(attempt) |

These participant/message names are design abstractions, not necessarily literal
exported TypeScript symbol names. The class-diagram crosswalk must map them to
actual hooks, route methods, Supabase calls and provider functions. Do not add
unimplemented classes or functions merely to match a sequence label. In UC-11,
the illustrated deduplication key is thresholdId:UTC-date; verify against source
before repeating it as implemented behavior.
