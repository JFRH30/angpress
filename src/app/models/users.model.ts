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
  orderby?:
    | 'id'
    | 'include'
    | 'name'
    | 'registered_date'
    | 'slug'
    | 'email'
    | 'url';
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
