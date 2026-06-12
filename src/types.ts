export interface MediaItem {
  mediaId: string;
  base64: string;
  mimeType: string;
  type: 'image' | 'video' | 'audio';
  name: string;
}

export interface MockupResult {
  id: string;
  templateId: string;
  title: string;
  base64: string;
  mimeType: string;
  mediaId: string;
}

export interface Template {
  id: string;
  title: string;
  icon: string;
  prompt: string;
  /**
   * Optional FIXED scene/template image. When set, this image is sent to the
   * model as the first reference image and the model must preserve it exactly,
   * only swapping the shoe design from the user's uploaded photos onto it.
   */
  sceneImage?: { base64: string; mimeType: string };
  /**
   * When true, this template is the "box / blank" mockup whose fixed scene
   * image is NOT fixed on the template itself but chosen at runtime from the
   * SHOE_BLANKS list via the dropdown in the right panel. Only this template
   * shows the blank selector.
   */
  blankSelector?: boolean;
}

/**
 * A reusable shoe "blank" (phôi giày): a fixed mockup scene (e.g. blank white
 * sneakers on a branded box) onto which the user's design is painted. Add a new
 * blank by importing its image and pushing one entry into SHOE_BLANKS.
 */
export interface ShoeBlank {
  id: string;
  label: string;
  sceneImage: { base64: string; mimeType: string };
  prompt: string;
}
