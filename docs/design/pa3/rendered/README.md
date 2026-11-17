# Rendered design figures

Parent generated PNGs using official `@mermaid-js/mermaid-cli` **12.2.0**, whose
version was read from the npm registry on 16 November 2026. Package execution
used npm's external cache, without adding dependencies to this repository.
Rendering used an isolated downloaded headless shell; it did not reuse user
browser cookies or authenticate to any service.

- `class-diagram.png`: complete class source overview; wide and intended as
  an overview. Use detail panels for readable operations.
- `class-display.png`, `class-account.png`, `class-routes.png`, `class-jobs.png`,
  `class-data.png`: selected subsets of the exact full-source definitions and
  relationships internal to each subset, arranged top to bottom for readability.
  Repeated nodes represent the same abstraction. Omitted cross-panel dependencies
  remain in the complete diagram; these panels do not add new app classes.
- `screen-flow.png`: complete screen/navigation flow.
- `flow-navigation.png`, `flow-dashboard.png`: readable panels of navigation and
  dashboard/resource-state portions, derived from the complete flow source.

The companion `.mmd` files are editable panel sources. The authoritative complete
sources are `../class-diagram.mmd` and `../screen-flow.mmd`. Re-render PNGs if
those sources change. `source-hashes.json` records source hashes at render time.
All nine Mermaid renders completed successfully. Render success checks diagram
syntax and generation; it is not evidence of application behavior or human review.

CLI reference: https://github.com/mermaid-js/mermaid-cli

Example after configuring a headless browser in Puppeteer's external cache:

```bash
npm exec --yes --package=@mermaid-js/mermaid-cli@12.2.0 -- \
  mmdc -i docs/design/pa3/class-diagram.mmd -o class-diagram.png -s 2
```
