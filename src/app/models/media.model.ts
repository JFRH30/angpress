/**
 * interface applied to url params when listing all medias.
 */
export interface MediaList {
  context?: 'view' | 'edit';
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  author?: number[];
  author_exclude?: number[];
  before?: string;
  exclude?: number[];
  include?: number[];
  offset?: number[];
  order?: 'asc' | 'desc';
  orderby?:
    | 'author'
    | 'date'
    | 'id'
    | 'include'
    | 'modified'
    | 'parent'
    | 'relevance'
    | 'slug'
    | 'title';
  parent?: number[];
  parent_exclude?: number;
  slug?: string;
  status?: string[];
  media_type?: 'image' | 'video' | 'audio' | 'application';
  mime_type?: string;
}

/**
 * interface applied when creating new media.
 */
export interface MediaCreate {
  file: string;
  date?: string;
  date_gmt?: string;
  slug?: number;
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  title?: string;
  author?: number;
  comment_status?: 'open' | 'closed';
  ping_status?: 'open' | 'closed';
  meta?: string[];
  template?: string;
  alt_text?: string;
  caption?: string;
  description?: string;
  post?: number;
}

/**
 * interface applied when querying media.
 */
export interface MediaRetrieve {
  id?: number;
  context?: 'view' | 'edit';
}

/**
 * interface applied when updating media.
 */
export interface MediaUpdate {
  id?: number;
  file?: string;
  date?: string;
  date_gmt?: string;
  slug?: number;
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  title?: string;
  author?: number;
  comment_status?: 'open' | 'closed';
  ping_status?: 'open' | 'closed';
  meta?: string[];
  template?: string;
  alt_text?: string;
  caption?: string;
  description?: string;
  post?: number;
}

/**
 * interface used to delete media.
 */
export interface MediaDelete {
  id?: number;
  force?: boolean;
}

/**
 * (default) response interface used when querying against multiple or single media.
 */
export interface MediaResponse {
  id?: number;
  date?: string;
  date_gmt?: string;
  guid?: { rendered?: string; raw?: string };
  modified?: string;
  modified_gmt?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title?: { rendered?: string; raw?: string };
  author?: number;
  comment_status?: string;
  ping_status?: string;
  template?: string;
  meta?: [];
  description?: { rendered?: string; raw?: string };
  caption?: { rendered?: string; raw?: string };
  alt_text?: string;
  media_type?: string;
  mime_type?: string;
  media_details?: {
    width?: number;
    height?: number;
    file?: string;
    image_meta?: {
      aperture?: string;
      credit?: string;
      camera?: string;
      caption?: string;
      created_timestamp?: string;
      copyright?: string;
      focal_length?: string;
      iso?: string;
      shutter_speed?: string;
      title?: string;
      orientation?: string;
      keywords?: [];
    };
    sizes?: {};
  };
  post?: number;
  source_url?: string;
  _links?: {
    self?: { attributes?: []; href?: string }[];
    collection?: { attributes?: []; href?: string }[];
    about?: { attributes?: []; href?: string }[];
    author?: { attributes?: { embeddable?: boolean }[]; href?: string }[];
    replies?: { attributes?: { embeddable?: boolean }[]; href?: string }[];
    'wp:action-assign-author'?: { attributes?: []; href?: string }[];
    curies?: { name?: string; href?: string; templated?: boolean }[];
  };
}
