# DiDung — simple cartoon story assets, version 03

Created 2026-10-23 using the built-in `image_gen.imagegen` tool. User requested simple animation-style cartoon artwork in place of the realistic artwork in version 02. Three new images were generated and inspected in the tool outputs, then copied unchanged into this workspace. Existing v2 assets remain intact; their original prompt log is [story-assets-v2.md](story-assets-v2.md).

Art direction: simple 2D cartoon, rounded dark outlines, flat cream/sage/green shapes, dot-eye character, sparse scenery. No photographic detail, detailed anatomy or painterly rendering. The outputs retain a slight soft tonal variation from generation; they are raster cartoon frames, not vector animation files. Current motion is scroll-driven camera/crossfade, not frame-by-frame character animation.

| Saved asset | Scene | Original output |
| --- | --- | --- |
| `story-room-v3.png` | Sitting at home with tea and a book | `exec-fa591002-49c3-43bb-841b-98173eb93ed6.png` |
| `story-window-v3.png` | Looking through the window | `exec-0650d64e-3094-4c93-b1a4-c692500a8b3b.png` |
| `story-outside-v3.png` | Same cartoon character stepping through the door | `exec-f9dd4d07-e8ce-4cdf-ad21-56ee47967bab.png` |

Originals remain under `C:/Users/PC/.codex/generated_images/01a1691a-2f9d-7a51-be11-d2e707060d90/`. All images use `transparent_background: false`. The window generation used the room as a style reference; the outside generation used the two preceding frames as references. They are fictional narrative scenes, not observations of actual air quality. HTML holds all text and environmental data.

## Final prompt — room

```text
Use case: illustration-story. Create ONE wide 3:2 scene for a simple 2D animated cartoon website story, DiDung. Art direction: VERY SIMPLE FLAT CARTOON ANIMATION BACKGROUND, solid flat fills, clean slightly rounded charcoal outlines of uniform width, large rounded geometric shapes, extremely sparse detail, like a friendly minimalist animated explainer film. Absolutely NOT photographic, NOT realistic illustration, NOT painterly, NOT textured, NOT 3D, NOT anime, no realistic lighting or shading, no gradients, no grain, no detailed foliage. Limited palette: cream #F4E6CD background, pale linen #EDDDC3, sage #91AC67, green #397447, charcoal #1E211E, dusty blue #B5D1DB, tiny warm orange accent. Scene: a cozy SIMPLE living room in Saigon. On RIGHT side a small charming cartoon young adult sits sideways on a rounded armchair, holding a simple tea cup and looking toward a big rectangular window. Character design: round cream face, two dot eyes, tiny simple nose, short solid dark rounded hair, sage green long sleeve shirt, cream trousers, simple slippers; expressive simplified silhouette, normal friendly proportions. Window contains only 4 or 5 simple flat roof shapes and 2 rounded green treetops. One simple ficus pot with 5 or 6 large solid oval leaves beside chair. A little side table with an open book. LEFT 45 percent remains almost entirely plain warm cream negative space for website heading, with NO text rendered. Wide balanced flat side-on composition; character and window on RIGHT; sparse airy layout. No lettering, no symbols, no UI, no panels, no watermark, no border. This is the first frame of a simple animated cartoon: person at home daydreaming about going outside.
```

## Final prompt — window

```text
Use case: illustration-story. Image 1 is ONLY a STYLE and SETTING reference for a new scene in the same simple 2D animated cartoon story. Generate ONE new wide 3:2 frame, not a collage. Match its clean rounded dark outlines, few solid flat color fills, simplified cartoon shapes, cream/sage/green/dusty-blue palette and friendly minimalist animation look. Scene: now we have moved closer to the SAME living room window to look outside. NO person in this frame. On RIGHT 60 percent: the simple rectangular charcoal-outlined window, a few cream block-shaped Saigon houses with orange roofs, two rounded green treetops, dusty-blue sky and two simple cream clouds. At far right a few large oval ficus leaves. On LEFT 40 percent: completely plain cream wall #F4E6CD, generous quiet space for HTML story text. Very sparse: only a handful of buildings, no intricate skyline, no tiny details. Soft rounded lines, flat side-on layout. This is a background from a simple animated cartoon, NOT realistic illustration, NOT a photo, NOT painterly, NOT 3D, NOT anime, NO grain or paper texture, NO realistic light or shadows, NO gradients, NO lettering, NO logo, NO UI, NO panels, NO numbers, NO watermark. Do not make the sky an indicator of actual air quality. Preserve the reference scene's window shapes and restrained colors.
```

## Final prompt — outside

```text
Use case: illustration-story. The last TWO images are reference frames from the SAME simple 2D animated cartoon; image with seated character is CHARACTER AND STYLE reference, window close-up is SETTING AND PALETTE reference. Make ONE NEW wide 3:2 cartoon frame for the final scene: the SAME small charming young adult with round simple face, dot eye, tiny nose, solid short rounded dark hair, sage long sleeve shirt, cream trousers, cream simple shoes now takes a step through a simple rounded doorway toward the sidewalk outside. Character is on RIGHT third, side/back three-quarter view, full body, calm small smile. Match the seated person's exact simple head and hair silhouette, outfit, proportions, dark rounded outline style. Show only 2 or 3 simple cream houses with warm muted orange roofs, 2 rounded green treetops, blue sky, one flat cream cloud. LEFT 45 percent is empty solid warm cream #F4E6CD exterior wall for HTML text. Extremely simple flat 2D cartoon animation background, clean consistent charcoal outlines, solid color shapes, minimal detail, friendly motion-ready silhouettes; cream #F4E6CD, linen #EDDDC3, sage #91AC67, green #397447, charcoal #1E211E, dusty blue #B5D1DB. No detailed buildings, NO photographic look, NO realistic anatomy rendering, NO painterly texture, NO 3D, NO anime, NO gradients, NO grain, NO realistic lighting/shadows, no text, no lettering, no logos, no UI, no panels, no watermark. Wide uncluttered side-on composition, cartoon story frame rather than a poster.
```

