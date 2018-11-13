////////////////////////
// REST API ENDPOINTS //
////////////////////////

export const WORDPRESS_ENDPOINT = 'https://angpress.sonub.com';
export const REST_ENDPOINT = WORDPRESS_ENDPOINT + '/wp-json/wp/v2';
export const CATEGORY_ENDPOINT = REST_ENDPOINT + '/categories';
export const COMMENT_ENDPOINT = REST_ENDPOINT + '/comments';
export const MEDIA_ENDPOINT = REST_ENDPOINT + '/media';
export const POST_ENDPOINT = REST_ENDPOINT + '/posts';
export const USER_ENDPOINT = REST_ENDPOINT + '/users';

/**
 * CUSTOM ENDPOINT
 */
export const CUSTOM_ENDPOINT = WORDPRESS_ENDPOINT + '/wp-json/custom/api/profile';

////////////////////////
// CATEGORIES RELATED //
////////////////////////

/**
 * interface applied to url params when listing all categories.
 */
export interface CategoryList {
  context?: 'view' | 'edit';
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count';
  hide_empty?: boolean;
  parent?: number;
  post?: number;
  slug?: string;
}

/**
 * interface applied when creating new categoory.
 */
export interface CategoryCreate {
  description?: string;
  name?: string;
  slug?: string;
  parent?: string;
  meta?: [];
}

/**
 * interface applied when querying category.
 */
export interface CategoryRetrieve {
  id?: number;
  context?: 'view' | 'edit';
}

/**
 * interface applied when updating category.
 */
export interface CategoryUpdate {
  id?: number;
  description;
  string;
  name?: string;
  slug?: string;
  parent?: string;
  meta?: [];
}

/**
 * interface used to delete category.
 */
export interface CategoryDelete {
  id?: number;
  force?: boolean;
}

/**
 * (default) response interface used when querying against multiple or single category.
 */
export interface CategoryResponse {
  id?: number;
  count?: number;
  description?: string;
  link?: string;
  name?: string;
  slug?: string;
  taxonomy?: string;
  parent?: number;
  meta?: [];
  _links?: {
    self?: { href?: string }[];
    collection?: { href?: string }[];
    about?: { href?: string }[];
    'wp:post_type'?: { href?: string }[];
    curies?: { name?: string; href?: string; templated?: boolean }[];
  };
  posts?: ViewPostResponse[];
}

//////////////////////
// COMMENTS RELATED //
//////////////////////

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
  children?: ViewCommentResponse[]; // added by me
  edit?: boolean; // added by me
  show?: boolean; // added by me
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

///////////////////
// MEDIA RELATED //
///////////////////

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
  orderby?: 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'title';
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
  file: Blob;
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

///////////////////
// POSTS RELATED //
///////////////////

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
  orderby?: 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'title';
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
  format?: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio';
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
  format?: 'standard' | 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio';
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

///////////////////
// USERS RELATED //
///////////////////
/**
 * interface applied to url params for retrieving all users
 */
export interface UserList {
  context?: 'view' | 'edit';
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  offset?: number;
  order?: 'asc' | 'desc';
  orderby?: 'id' | 'include' | 'name' | 'registered_date' | 'slug' | 'email' | 'url';
  slug?: string[];
  roles?: string[];
}

/**
 * interface for registering user.
 * applied to data from register form.
 */
export interface UserCreate {
  username: string; // Required: 1
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string; // Required: 1
  url?: string;
  description?: string;
  locale?: string;
  nickname?: string;
  slug?: string;
  roles?: string[];
  password: string; // Required: 1
  meta?: [];
}

/**
 * interface applied to url params when getting specific use.
 */
export interface UserRetrieve {
  id: number;
  context?: 'view' | 'edit';
}

/**
 * interface applied when updating user data.
 */
export interface UserUpdate {
  id?: number;
  username?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  url?: string;
  description?: string;
  locale?: string;
  nickname?: string;
  slug?: string;
  roles?: string[];
  password?: string;
  meta?: [];
}

/**
 * interface applied when deleting user.
 * note: it is required to reassign posts of deleted user.
 */
export interface UserDelete {
  id?: number;
  force: boolean; // Required: true
  reassign: number; // Required: 1
}

/**
 * (default) interface when querying against multiple or single post.
 */
export interface ViewUserResponse {
  id?: number;
  name?: string;
  url?: string;
  description?: string;
  link?: string;
  slug?: string;
  avatar_urls?: {
    24?: string;
    48?: string;
    96?: string;
  };
  meta?: [];
  security_code?: string;
  _links?: {
    self?: { href?: string }[];
    collection?: { href?: string }[];
  };
}

/**
 * response interface when using 'context=edit' params.
 */
export interface EditUserResponse {
  id?: number;
  username?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  url?: string;
  description?: string;
  link?: string;
  locale?: string;
  nickname?: string;
  slug?: string;
  roles?: string[];
  registered_date?: string;
  capabilities?: {
    moderate_comments?: boolean;
    manage_categories?: boolean;
    manage_links?: boolean;
    upload_files?: boolean;
    unfiltered_html?: boolean;
    edit_posts?: boolean;
    edit_others_posts?: boolean;
    edit_published_posts?: boolean;
    publish_posts?: boolean;
    edit_pages?: boolean;
    read?: boolean;
    level_7?: boolean;
    level_6?: boolean;
    level_5?: boolean;
    level_4?: boolean;
    level_3?: boolean;
    level_2?: boolean;
    level_1?: boolean;
    level_0?: boolean;
    edit_others_pages?: boolean;
    edit_published_pages?: boolean;
    publish_pages?: boolean;
    delete_pages?: boolean;
    delete_others_pages?: boolean;
    delete_published_pages?: boolean;
    delete_posts?: boolean;
    delete_others_posts?: boolean;
    delete_published_posts?: boolean;
    delete_private_posts?: boolean;
    edit_private_posts?: boolean;
    read_private_posts?: boolean;
    delete_private_pages?: boolean;
    edit_private_pages?: boolean;
    read_private_pages?: boolean;
    editor?: boolean;
  };
  extra_capabilities?: {
    editor?: boolean;
  };
  avatar_urls?: {
    '24'?: string;
    '48'?: string;
    '96'?: string;
  };
  meta?: [];
  security_code?: string;
  _links?: {
    self?: { href?: string }[];
    collection?: { href?: string }[];
  };
}

/**
 * response from CUSTOM_ENDPOINT
 */
export interface ProfileResponse {
  email?: string;
  id?: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  nickname?: string;
  meta?: [];
  register_date?: string;
  username?: string;
  security_code?: string;
}
