/**
 * this the base url of wordpress.
 */
export const WORDPRESS_ENDPOINT = 'http://localhost:80/wordpress';

/**
 * this url gives access to wordpress REST API.
 */
export const REST_ENDPOINT = WORDPRESS_ENDPOINT + '/wp-json/wp/v2';

/**
 * users endpoint without params.
 */
export const USER_ENDPOINT = REST_ENDPOINT + '/users';

/**
 * posts endpoint without params.
 */
export const POST_ENDPOINT = REST_ENDPOINT + '/posts';

/**
 * comments endpoint without params.
 */
export const COMMENT_ENDPOINT = REST_ENDPOINT + '/comments';

/**
 * categories endpoint without params.
 */
export const CATEGORY_ENDPOINT = REST_ENDPOINT + '/categories';

/**
 * media endpoint without params.
 */
export const MEDIA_ENDPOINT = REST_ENDPOINT + '/media';

/**
 * custom endpoint that ships with Basic Auth hacked by mr.Song.
 */
export const CUSTOM_ENDPOINT =
  WORDPRESS_ENDPOINT + '/wp-json/custom/api/profile';
