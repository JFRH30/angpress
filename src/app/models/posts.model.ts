import { ViewUserResponse } from './users.model';
import { ViewCommentResponse } from './comments.model';

/**
 * interface applied to url params to display all posts.
 */
export interface PostList {
  context?: 'view' | 'embed' | 'edit';
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  author?: number;
  author_exclude?: any;
  before?: string;
  exclude?: number[];
  include?: number[];
  offset?: number;
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
  slug?: string[];
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  categories?: number | number[];
  categories_exclude?: string[];
  tags?: number[];
  tags_exclude?: string[];
  sticky?: boolean;
}

/**
 * interface applied when creating new posts.
 */
export interface PostCreate {
  date?: string;
  date_gmt?: string;
  slug?: string;
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  password?: string;
  title?: string;
  content?: string;
  author?: number;
  excerpt?: string;
  featured_media?: number;
  comment_status?: 'open' | 'closed';
  ping_status?: 'open' | 'closed';
  format?:
    | 'standard'
    | 'aside'
    | 'chat'
    | 'gallery'
    | 'link'
    | 'image'
    | 'quote'
    | 'status'
    | 'video'
    | 'audio';
  meta?: [];
  sticky?: boolean;
  template?: string;
  categories?: number | number[];
  tags?: number[];
}

/**
 * interface applied when querying post.
 */
export interface PostRetrieve {
  id: number;
  context?: 'view' | 'embed' | 'edit';
  password?: string;
}

/**
 * interface applied when updating post.
 */
export interface PostUpdate {
  id: number;
  date?: string;
  date_gmt?: string;
  slug?: string;
  status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  password?: string;
  title?: string;
  content?: string;
  author?: number;
  excerpt?: [];
  featured_media?: number;
  comment_status?: 'open' | 'closed';
  ping_status?: 'open' | 'closed';
  format?:
    | 'standard'
    | 'aside'
    | 'chat'
    | 'gallery'
    | 'link'
    | 'image'
    | 'quote'
    | 'status'
    | 'video'
    | 'audio';
  meta?: [];
  sticky?: boolean;
  template?: string;
  categories?: number | number[];
  tags?: number[];
}

/**
 * interface applied when deleting post.
 */
export interface PostDelete {
  id?: number;
  force?: boolean;
}

/**
 * (default) response interface when quering against multiple or single post.
 */
export interface ViewPostResponse {
  id?: number;
  date?: string;
  date_gmt?: string;
  guid?: { rendered?: string; raw?: string };
  modified?: string;
  modified_gmt?: string;
  password?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title?: { raw?: string; rendered?: string };
  content?: { raw?: string; rendered?: string; protected?: boolean };
  excerpt?: { raw?: string; rendered?: string; protected?: boolean };
  author?: number;
  featured_media?: number;
  comment_status?: string;
  ping_status?: string;
  sticky?: boolean;
  template?: string;
  format?: string;
  meta?: [];
  categories?: number[];
  tags?: [];
  _links?: {
    self?: { href?: string }[];
    collection?: { href?: string }[];
    about?: { href?: string }[];
    author?: { embeddable?: boolean; href?: string }[];
    replies?: { embeddable?: boolean; href?: string }[];
    'version-history'?: [{ count?: number; href?: string }];
    'wp:attachment'?: { href?: string }[];
    'wp:term'?: { taxonomy?: string; embeddable?: boolean; href?: string }[];
    curies?: { name?: string; href?: string; templated?: boolean }[];
  };
  _embedded?: { author?: ViewUserResponse; replies?: ViewCommentResponse[] };
}

/**
 * response interface when using 'context=edit' on POST_ENDPOINT.
 */
export interface EditPostResponse {
  id?: number;
  date?: string;
  date_gmt?: string;
  guid?: { rendered?: string; raw?: string };
  modified?: string;
  modified_gmt?: string;
  password?: string;
  slug?: string;
  status?: string;
  type?: string;
  link?: string;
  title?: { raw?: string; rendered?: string };
  content?: { raw?: string; rendered?: string; protected?: boolean };
  excerpt?: { raw?: string; rendered?: string; protected?: boolean };
  author?: number;
  featured_media?: number;
  comment_status?: string;
  ping_status?: string;
  sticky?: boolean;
  template?: string;
  format?: string;
  meta?: [];
  categories?: number[];
  tags?: [];
  _links?: {
    self?: { href?: string }[];
    collection?: { href?: string }[];
    about?: { href?: string }[];
    author?: { embeddable?: boolean; href?: string }[];
    replies?: { embeddable?: boolean; href?: string }[];
    'version-history'?: [{ count?: number; href?: string }];
    'wp:attachment'?: { href?: string }[];
    'wp:term'?: { taxonomy?: string; embeddable?: boolean; href?: string }[];
    'wp:action-publish'?: { href?: string }[];
    'wp:action-sticky'?: { href?: string }[];
    'wp:action-assign-author'?: { href?: string }[];
    'wp:action-create-categories'?: { href?: string }[];
    'wp:action-assign-categories'?: { href?: string }[];
    'wp:action-create-tags'?: { href?: string }[];
    'wp:action-assign-tags'?: { href?: string }[];
    curies?: { name?: string; href?: string; templated?: boolean }[];
  };
}
