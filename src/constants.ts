import { Template, ShoeBlank } from './types';
import { LITTLEOWH_BOX_BASE64, LITTLEOWH_BOX_MIME } from './assets/littleowhBox';
import { AF1_BOX_BASE64, AF1_BOX_MIME } from './assets/af1Box';

/**
 * Builds the strict "keep the scene, only repaint the upper" prompt shared by
 * every shoe blank. Pass a short description of the FIXED scene (box, branding,
 * silhouette) so the model knows exactly what must stay untouched.
 */
function blankLockPrompt(sceneDescription: string): string {
  return `STRICT TEMPLATE-LOCK MODE.

REFERENCE IMAGE #1 (${sceneDescription}) is a FIXED MOCKUP TEMPLATE. Reproduce it faithfully and change NOTHING about the scene:
- Keep the exact composition: the shoes at the same positions and angles, resting on/against the same surface or box.
- Keep every printed branding text and logo EXACTLY as shown — do not alter, move, translate, recolor, or remove any text or logo.
- Keep the same camera angle, perspective, framing, studio lighting, soft shadows, reflections and background.
- Keep the shoe silhouette, proportions and lace layout unchanged. Keep the SOLE, midsole and outsole EXACTLY as in reference image #1 — they are plain white and completely unbranded.

THE ONLY THING YOU MAY CHANGE: repaint the blank shoe UPPER so its DESIGN matches the OTHER reference image(s) — reproduce that design EXACTLY and pixel-faithfully: its precise colors (hex-accurate), materials, textures, patterns, artwork, panel layout, stitching and logos, mapped onto the corresponding panels of BOTH shoes. Keep the design identical across the inner and outer shoe.

CONSTRAINTS:
- Do NOT change the box, background, lighting, or scene in any way.
- SOLE / MIDSOLE BRANDING BAN: The sole and midsole stay completely plain exactly as in reference image #1. Do NOT add ANY text or logo to the sole/midsole/heel — specifically NO "AIR", NO "NIKE", no swoosh, no Jumpman, no numbers — even though the silhouette may resemble a famous sneaker. If the template sole has no lettering, the output sole has no lettering.
- NO SPORTSWEAR LOGOS: Do NOT add a Nike swoosh, Jordan/Jumpman or any sportswear brand mark anywhere on the shoe. Only logos present in the design-reference image(s) are allowed.
- DESIGN FIDELITY: Reproduce the uploaded design as a 1:1 copy. Do NOT add, remove, invent, embellish or modify ANY detail, logo, text, pattern or element that is not present in the design reference. No creative reinterpretation.
- Match the colorway precisely; if the upper is patterned/printed, wrap it naturally over the panels following the template's shape and folds.
- Photorealistic high-end commercial product photography, sharp and clean.`;
}

/**
 * Shoe blanks selectable from the "Phôi giày" dropdown (box mockup only).
 *
 * 👉 To add a new blank:
 *   1. Drop its image into src/assets/ and create a base64 export file
 *      (see littleowhBox.ts as the pattern).
 *   2. Import it above.
 *   3. Push one entry below with a unique id, a dropdown label, the imported
 *      sceneImage, and a prompt — use blankLockPrompt('<describe the scene>').
 */
export const SHOE_BLANKS: ShoeBlank[] = [
  {
    id: 'aj1',
    label: 'AJ1',
    sceneImage: { base64: LITTLEOWH_BOX_BASE64, mimeType: LITTLEOWH_BOX_MIME },
    prompt: blankLockPrompt('two blank white high-top sneakers, one resting on/against a kraft cardboard shoe box printed with the "SHOES CUSTOMIZED BY LITTLEOWH" / "STORE" branding and the owl logo, on a light-gray studio gradient background')
  },
  {
    id: 'af1',
    label: 'AF1',
    sceneImage: { base64: AF1_BOX_BASE64, mimeType: AF1_BOX_MIME },
    prompt: blankLockPrompt('two blank white low-top sneakers, one resting on top of and one standing in front of a kraft cardboard shoe box printed with the orange/brown branding text "ANIME SHOES CUSTOMIZED BY LITTLEOWH" and "ONE STOP ANIME STORE" plus the LITTLEOWH owl logo, on a light-gray studio gradient background')
  }
  // 👇 Thêm phôi mới ở đây, ví dụ:
  // {
  //   id: 'phoi3',
  //   label: 'Phôi giày 3',
  //   sceneImage: { base64: PHOI3_BASE64, mimeType: PHOI3_MIME },
  //   prompt: blankLockPrompt('the blank sneakers on a white pedestal with "BRAND" text')
  // }
];

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
    prompt: 'Premium studio product photography of the original shoes from the reference images, presented with their open cardboard shoe box. CAMERA ANGLE: shot from directly above (top-down / flat-lay bird\'s-eye view) OR from a high angle looking down at roughly 45–50 degrees. COMPOSITION is flexible — for example one shoe resting inside the open box and the other placed neatly beside it outside, or both shoes arranged together inside the box, or one in and one out at a pleasing angle. Whichever arrangement is used, BOTH shoes must be FULLY and CLEARLY visible in the frame — not overlapping, cropped or hidden by the box. High-end cinematic lighting, crisp textures, soft shadows, professional studio background.'
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
    title: 'Phôi giày (Hộp)',
    icon: 'design_services',
    blankSelector: true,
    // Scene image + prompt are chosen at runtime from SHOE_BLANKS via the dropdown.
    prompt: ''
  },
  {
    id: 'cosplay_shop',
    title: 'Cửa hàng Cosplay',
    icon: 'store',
    prompt: 'Hyper-realistic lifestyle shot of a person wearing the reference shoes on their feet, standing inside a vibrant Anime Cosplay store. The camera framing captures the entire shoe clearly from a low angle. The background is filled with colorful anime costumes on racks, wigs, and cosplay props with a soft bokeh effect. High-end commercial photography, maintaining strict fidelity to the original shoe design.'
  }
];
