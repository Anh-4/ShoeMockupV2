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
}
