import { Template } from './types';
import { LITTLEOWH_BOX_BASE64, LITTLEOWH_BOX_MIME } from './assets/littleowhBox';

export const MOCKUP_TEMPLATES: Template[] = [
  {
    id: 'street',
    title: 'Trên phố',
    icon: 'location_on',
    prompt: 'Hyper-realistic lifestyle shot of a person wearing the reference shoes on their feet, walking on a high-end city street. The camera is positioned at a low front-facing or slightly diagonal angle, clearly showing the front toe box and side panels of both shoes in mid-stride. High-end commercial photography, maintaining strict fidelity to every material and design detail of the original shoe.'
  },
  {
    id: 'box',
    title: 'Trong hộp giày',
    icon: 'inventory_2',
    prompt: 'Premium studio product photography of the original shoes from the reference images. The shoes are presented with their open cardboard shoe box. Composition: either one shoe is placed inside the box and the other sits elegantly outside next to it, or both shoes are neatly arranged together inside the open box. The camera angle is low and slightly diagonal from the front, clearly showcasing the front toe box and the side details of the shoes. High-end cinematic lighting, crisp textures, soft shadows, and professional studio background.'
  },
  {
    id: 'classroom',
    title: 'Trong lớp học',
    icon: 'school',
    prompt: 'Hyper-realistic lifestyle shot of a person wearing the reference shoes on their feet while sitting in a classroom. The camera angle is low, focusing on the feet and the floor. In the background, desks and a chalkboard are visible with soft bokeh. Preserve every stitch and material of the original design.'
  },
  {
    id: 'hand',
    title: 'Xách trên tay',
    icon: 'pan_tool',
    prompt: 'Hyper-realistic lifestyle close-up of a hand holding the reference shoe. The camera focuses on the sleek side profile or the intricate front details of the shoe upper and toe box. The outsole is not the focus and is shown at a subtle angle or partially hidden to emphasize the upper design. High-end lighting captures the material textures and colors exactly as shown in the reference photos.'
  },
  {
    id: 'lifestyle_wood',
    title: 'Trên kệ gỗ',
    icon: 'shelves',
    prompt: 'The shoe is resting on a rustic wooden shelf in a sneaker shop. Warm ambient lighting, focus on the side profile and midsole construction.'
  },
  {
    id: 'littleowh_box',
    title: 'Phôi LITTLEOWH',
    icon: 'design_services',
    sceneImage: { base64: LITTLEOWH_BOX_BASE64, mimeType: LITTLEOWH_BOX_MIME },
    prompt: `STRICT TEMPLATE-LOCK MODE.

REFERENCE IMAGE #1 (the blank white high-top sneakers on a kraft shoe box) is a FIXED MOCKUP TEMPLATE. Reproduce it faithfully and change NOTHING about the scene:
- Keep the exact composition: two high-top sneakers (Air Jordan 1 silhouette) at the same positions and angles, resting on/against the cardboard shoe box.
- Keep the cardboard box EXACTLY, including the printed branding text "SHOES CUSTOMIZED BY LITTLEOWH" / "STORE" and the owl logo — do not alter, move, translate, recolor, or remove any text or logo.
- Keep the same camera angle, perspective, framing, studio lighting, soft shadows, reflections and the light-gray gradient background.
- Keep the shoe silhouette, proportions, sole, midsole, black outsole and lace layout unchanged.

THE ONLY THING YOU MAY CHANGE: repaint the blank white shoe UPPER so its DESIGN matches the OTHER reference image(s) — apply that design's exact colors (hex-accurate), materials, textures, patterns, panel layout, stitching and logos onto the corresponding panels of BOTH shoes. Keep the design consistent across the inner and outer shoe.

CONSTRAINTS:
- Do NOT change the box, background, lighting, or scene in any way.
- Do NOT add any brand logo that is not present in the design reference.
- Match the colorway precisely; if the upper is patterned/printed, wrap it naturally over the panels following the template's shape and folds.
- Photorealistic high-end commercial product photography, 8k, razor sharp.`
  },
  {
    id: 'cosplay_shop',
    title: 'Cửa hàng Cosplay',
    icon: 'store',
    prompt: 'Hyper-realistic lifestyle shot of a person wearing the reference shoes on their feet, standing inside a vibrant Anime Cosplay store. The camera framing captures the entire shoe clearly from a low angle. The background is filled with colorful anime costumes on racks, wigs, and cosplay props with a soft bokeh effect. High-end commercial photography, maintaining strict fidelity to the original shoe design.'
  }
];
