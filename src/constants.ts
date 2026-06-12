import { Template, ShoeBlank } from './types';
import { LITTLEOWH_BOX_BASE64, LITTLEOWH_BOX_MIME } from './assets/littleowhBox';
import { AF1_BOX_BASE64, AF1_BOX_MIME } from './assets/af1Box';

/**
 * Builds the strict "keep the scene, only repaint the upper" prompt shared by
 * every shoe blank. Pass a short description of the FIXED scene (box, branding,
 * silhouette) so the model knows exactly what must stay untouched.
 */
function blankLockPrompt(sceneDescription: string): string {
  return `STRICT TEMPLATE-LOCK MODE — this is an IMAGE EDIT of reference image #1, NOT a fresh render.

IMAGE ROLES:
- REFERENCE IMAGE #1 (${sceneDescription}) is the FIXED MOCKUP TEMPLATE — keep its scene exactly.
- REFERENCE IMAGE #2 (and any further images) are the DESIGN SOURCE — the colorway, artwork, materials and details you must copy onto the shoe upper.

UNBRANDED CUSTOM SHOE (critical): The sneakers are generic, CUSTOM, UNBRANDED shoes. They are NOT Nike, NOT an Air Force 1, NOT an Air Jordan. There is NO Nike heel tab, NO swoosh, and the midsole has NO embossed or printed "AIR" wording anywhere. Even though the shape resembles those shoes, render the midsole and heel smooth, clean and completely BLANK. Do NOT "correct" the shoe to look like a real branded sneaker.

KEEP EXACTLY AS IN REFERENCE IMAGE #1 (change nothing here):
- The composition: the shoes at the same positions and angles, resting on/against the same surface or box.
- Every printed text and logo on the BOX — do not alter, move, translate, recolor or remove it.
- The camera angle, perspective, framing, studio lighting, soft shadows, reflections and background.
- The shoe silhouette, proportions and lace layout. The SOLE, midsole and outsole stay plain white and unbranded exactly as in image #1.

WHAT YOU MUST CHANGE — apply the DESIGN from the design-source image(s) onto the shoe UPPER of BOTH shoes: copy its exact colors (hex-accurate), materials, textures, patterns, artwork, panel layout, stitching and logos onto the matching panels. The finished shoes MUST clearly display this design — they must NOT stay plain white. If unsure, apply MORE of the design's colors/artwork rather than less. Keep the design consistent across the inner and outer shoe.

CONSTRAINTS:
- Do NOT change the box, background, lighting or scene in any way.
- SOLE / MIDSOLE BRANDING BAN: keep the sole and midsole plain exactly as in image #1. Add NO text or logo to the sole/midsole/heel — NO "AIR", NO "NIKE", no swoosh, no Jumpman, no numbers — even if the silhouette resembles a famous sneaker.
- SMOOTH MIDSOLE GEOMETRY: the midsole is ONE smooth, continuous, clean white surface from toe to heel. Add NO notch, recess, step, cut-out, groove, vent hole, panel line, stitch or embossed shape anywhere on it — especially at the HEEL/back. Reproduce the plain smooth midsole of reference image #1 exactly; the ONLY texture allowed is the normal tread on the very bottom of the outsole.
- Apply ONLY the design from the design-source image(s); do not invent extra logos, text or patterns that are not in it.
- Match the colorway precisely; wrap patterned/printed designs naturally over the panels following the template's folds.
- Photorealistic, sharp and clean.`;
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
