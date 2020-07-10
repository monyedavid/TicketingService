/**
 * @file   A collection of static routes that do not change depending on version
 */

export const oauth_path = "/oauth";
export const localAuth_path = "/local/auth";

export const register_path = "/register";
export const login_path = "/login";
export const logout_path = "/logout";

/**
 * @class  static_ApiRoutes
 */

export default class static_ApiRoutes {
  /**
   * @method       oauth_callback
   * @description  callback route for respective provider
   */
  public oauth_callback() {
    return {
      google: "/auth/google/callback",
    };
  }
}
