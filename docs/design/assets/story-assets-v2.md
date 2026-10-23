# DiDung — story assets, version 02

Created 2026-10-23 with the built-in `image_gen.imagegen` tool, not the CLI fallback. User authorized creating assets for the narrative. All three outputs were inspected as returned by the generation tool and copied unchanged into this directory; originals remain under `C:/Users/PC/.codex/generated_images/01a1691a-2f9d-7a51-be11-d2e707060d90/`.

These are narrative illustrations, not observation photographs, camera feeds, maps, weather forecasts or evidence of safe air. No actual location or real person's identity is represented. Text, data and UI remain HTML.

| Project asset | Purpose | Original output |
| --- | --- | --- |
| `story-room-v2.png` | Sitting at home; the wish to go outside | `exec-e433951b-502f-4e28-afd2-662e9cea5138.png` |
| `story-window-v2.png` | Moving closer to the window; uncertainty about air | `exec-a9aee9ef-5e98-4409-b4ba-cc5dd3a88e0b.png` |
| `story-outside-v2.png` | Stepping outside, only for the positive demo ending | `exec-ad54cabc-9d79-4595-ad9b-eff6e2b65c00.png` |

All generated as opaque landscape images (`transparent_background: false`). Room and outside share a short-haired person in a sage shirt and cream trousers; the window scene is first-person. Generated independently, so the architecture is a visual match rather than an exact reconstructed continuous room. A slight change of camera angle is intentional; exact character/architecture continuity should be assessed in browser review before production use.

The inherited `botanical.png` and preview 01 are preserved. No existing image was overwritten.

## Final prompt: room

```text
Use case: illustration-story. Asset type: wide cinematic background image for DiDung, an editorial Vietnamese air-quality scroll-story website. Create ONE finished landscape image (not a storyboard, no panels, no text). Scene: a quiet small contemporary Saigon apartment in late morning, seen from inside. A young Vietnamese adult with short dark hair, wearing a muted sage linen shirt and cream trousers, sits on the right side on a simple wooden chair near a large openable window, seen from behind in three-quarter profile, pausing from a notebook and a ceramic tea cup, looking toward the window as if wishing to step outside. A ficus beside the window, pale linen curtain, warm cream plaster walls, restrained wood furniture, distant leafy Saigon neighborhood softly visible through glass. Style: sophisticated editorial illustration with fine painterly photographic texture, organic realism, subtle paper grain, elegant natural anatomy, premium art direction, soft atmospheric daylight. Color palette: warm vellum #F4E6CD, linen #EDDDC3, leaf greens #397447, charcoal #1E211E, dusty blue #B5D1DB. Composition: landscape 3:2, strong quiet negative space on LEFT 42 percent (cream wall with delicate sunlight) for HTML headline; character, window and plant concentrated RIGHT, spacious refined architecture; no border. Mood: intimate, hopeful, reflective, everyday Vietnamese life, no luxury decor. Avoid any text, letters, typography, logos, watermarks, UI elements, numbers, phone screen, face closeups, visible air pollution or dramatic smog. This is artwork for a narrative scene, not a representation of actual measured air quality.
```

## Final prompt: window

```text
Use case: illustration-story. Asset type: a cinematic landscape narrative scene for DiDung's Vietnamese scroll-story landing page. Generate ONE landscape 3:2 image, not a storyboard or collage. First-person point of view from inside a warm ordinary Saigon apartment looking closely through a large dark bronze-framed casement window toward a leafy neighborhood of cream houses, terracotta rooftops and an understated distant modern Saigon skyline, dusty blue sky. The window occupies the RIGHT two thirds. A pale linen curtain and a few ficus leaves softly frame the view; warm cream plaster interior wall on LEFT 40 percent is quiet uncluttered negative space for HTML headline. Match a calm premium organic editorial style: realistic painterly photographic textures, subtle paper grain, soft late-morning sunlight, vellum #F4E6CD, linen #EDDDC3, botanical green #397447, dusty blue #B5D1DB, charcoal #1E211E. Camera is closer to the glass than a room interior scene, suggesting the viewer has stood up and approached the window. No people, no hands, no furniture blocking the window, no lettering, no UI, no AQI numbers, no logos, no watermark, no overt smog. The picture should make the outdoors look inviting but must not visually claim that air quality has been measured. Refined everyday Vietnam, spacious editorial composition, not glossy 3D.
```

## Final prompt: outside

```text
Use case: illustration-story. Asset type: cinematic landscape artwork for the final scene of DiDung, a Vietnamese air-quality scroll-story website. Generate ONE landscape image, no panels, no text, no UI. A young Vietnamese adult with short dark slightly tousled hair, sage green linen long-sleeve shirt with sleeves rolled to elbows, cream straight-leg trousers, simple cream sneakers, seen from BEHIND taking a quiet first step out of a cream-plastered apartment doorway onto a leafy Saigon neighborhood sidewalk in late morning. Character on right third, full body visible, relaxed ordinary anatomy, no bag. Terracotta roofs, warm cream low-rise buildings, green tropical foliage, tree-filtered light, gentle dusty blue sky, a distant unobtrusive Saigon skyline. Sophisticated editorial organic realism, fine painterly photographic texture, subtle warm paper grain, calm premium composition. Palette warm vellum #F4E6CD, linen #EDDDC3, green #397447 and #91AC67, dark charcoal #1E211E, dusty blue #B5D1DB. LEFT 40 percent is an uncluttered sunlit cream exterior wall with subtle leaf shadows, reserved for HTML copy, right holds doorway person and street. Match the mood of a warm quiet Vietnamese apartment and the character's short dark hair, sage linen shirt, cream trousers. Landscape 3:2. No typography, no letters, no watermark, no brands, no interface, no phone. Do not create a visual promise of air quality; this is only narrative art. No exaggerated fantasy, no dramatic pollution, no collage, no glossy 3D.
```
