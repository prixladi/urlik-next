export type CreateAnonymousUrlModel = {
  url: string;
};

export type CreateUrlModel = {
  url: string;
  path: string;
};

export type UrlPreviewsModel = {
  previews: UrlPreviewModel[];
  count: number;
};

export type UrlPreviewModel = {
  id: string;
  url: string;
  path: string;
  hitCount: number;
};

export type UrlDetailModel = UrlPreviewModel;
