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
}
