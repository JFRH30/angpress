/**
 * interface applied in querying all comment.
 */
export interface CommetList {
  context?: 'view' | 'edit';
  page?: number;
  per_page?: number;
  search?: string;
  after?: string;
  author?: number[];
  author_exclude?: number[];
  author_email?: string;
  before?: string;
  exclude?: number[];
  include?: number[];
  offset?: number[];
  order?: 'asc' | 'desc';
  orderby?: 'date' | 'date_gmt' | 'id' | 'include' | 'post' | 'parent' | 'type';
  parent?: number[];
  parent_exclude?: number[];
  post?: number[];
  status?: string;
  type?: string;
  password?: string;
}

/**
 * interface used when creating new comment.
 */
export interface CommentCreate {
  author?: number;
  author_email?: string;
  author_ip?: string;
  author_name?: string;
  author_url?: string;
  author_user_agent?: string;
  content?: string;
  date?: string;
  date_gmt?: string;
  parent?: number;
  post?: number;
  status?: string;
  meta?: [];
}

/**
 * interface used when getting comment.
 */
export interface CommentRetrieve {
  id?: number;
  context?: 'view' | 'edit';
  password?: string;
}

/**
 * interface used when updating comment.
 */
export interface CommentUpdate {
  id?: number;
  author?: number;
  author_email?: string;
  author_ip?: string;
  author_name?: string;
  author_url?: string;
  author_user_agent?: string;
  content?: string;
  date?: string;
  date_gmt?: string;
  parent?: number;
  post?: number;
  status?: string;
  meta?: [];
}

/**
 * interface used when deleting comment.
 */
export interface CommentDelete {
  id?: number;
  force?: boolean;
  password?: string;
}

/**
 * (default) response interface when querying multiple or single comment.
 */
export interface ViewCommentResponse {
  id?: number;
  post?: number;
  parent?: number;
  author?: number;
  author_name?: string;
  author_url?: string;
  date?: string;
  date_gmt?: string;
  content?: { rendered?: string };
  link?: string;
  status?: string;
  type?: string;
  author_avatar_urls?: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
  };
  meta?: [];
  _links?: {
    self?: { href?: string }[];
    collection?: { href?: string }[];
    up?: { embeddable?: boolean; post_type?: string; href?: string }[];
  };
}

/**
 * response interface when using 'context=edit' params.
 */
export interface EditCommentResponse {
  id?: number;
  post?: number;
  parent?: number;
  author?: number;
  author_name?: string;
  author_url?: string;
  author_ip?: string;
  author_user_agent?: string;
  date?: string;
  date_gmt?: string;
  content?: { rendered?: string };
  link?: string;
  status?: string;
  type?: string;
  author_avatar_urls?: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
  };
  meta?: [];
  _links?: {
    self?: { href?: string }[];
    collection?: { href?: string }[];
    up?: { embeddable?: boolean; post_type?: string; href?: string }[];
  };
}
