/**
 * interface applied to url params when listing all categories.
 */
export interface CategoryList {
  context?: 'view ' | 'edit';
  page?: number;
  per_page?: number;
  search?: string;
  exclude?: number[];
  include?: number[];
  order?: 'asc' | 'desc';
  orderby?:
    | 'id'
    | 'include'
    | 'name'
    | 'slug'
    | 'term_group'
    | 'description'
    | 'count';
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
}
