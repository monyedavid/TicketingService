export const serverName = "wrn-server";
export const serverMessage = "Server is running on http://localhost";
export const redisessionprefix = "sess:";
export const userseesionidPrefix = "usesrSids:";
export const forgotPasswordPrefix = "forgotPassword";

// OAuth
export const twitter = "twitter";
export const google = "google";
export const facebook = "facebook";
export const microsoft = "microsoft";
export const linkedin = "linkedin";

export const local = "local";
export const o_auth = "o_auth";

export const rsv = "registration schema validation";

// ternaries

export const test = "test";
export const production = "production";
export const profile = "profile";
export const email = "email";
export const inProd = process.env.NODE_ENV === "production";

export const frontendUrl = inProd
  ? process.env.FRONT_END_URL
  : process.env.FRONT_END_URL_DEV;

// Error Messages
export const invalidLogin = "inavlid login";
export const forgotPasswordLockError = "Account is Locked";
export const duplicateEmail = "Email alraedy taken";
export const emailNotLongEnough = "email must be at least 3 characters";
export const invalidEmail = "email must be a valid email";
export const passwordNotLongEnough = "password must be at least 3 characters";
export const not_found_e = "not found";
export const id_not_provided_e = "no id was provided";

export const invalidUserRole =
  "The Default user role on registration is 2(User).";

export const s_logout = "logout success";
export const g_success = "success";

// PubSub
export const PUB_SUB_RAISE_TICKET = "PUB_SUB_RAISE_TICKET";
export const PUB_SUB_REPLY_TICKET = "PUB_SUB_REPLY_TICKET";
