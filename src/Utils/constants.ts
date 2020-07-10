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
export const fsv = "failed schema validation";
export const failed_update = "an error occured while performing update";

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
export const confirmEmailError = "Please confirm your email";
export const forgotPasswordLockError = "Account is Locked";
export const expiredKeyError = "Key has expired";
export const duplicateEmail = "Email alraedy taken";
export const duplicateUserName = "Username already taken";
export const emailNotLongEnough = "email must be at least 3 characters";
export const invalidEmail = "email must be a valid email";
export const passwordNotLongEnough = "password must be at least 3 characters";
export const userNotFoundError = "could not find user with that email";
export const not_found_e = "not found";
export const id_not_provided_e = "no id was provided";

export const invalidUserRole =
  "The Default user role on registartion is 2(User). User roles are 2 for User(Lawyers and regulars) 3 for (University Student) and 5 for (LawSchool student)";

export const law_university_role_select =
  "Student type of law university has a valid role id of 3";

export const law_school_role_select =
  "Student type of law school has a valid role id of 5";

export const five_hundred_message = "An error occured while retrieving data";

export const five_hundred_path = "Internal";
export const five_hundred_pmessage = "Internal sever error";

export const database_p = "DB";

export const s_updatePassword = "successfully updated password";
export const s_logout = "logout success";
export const g_success = "success";

// Law Terminologies
export const court_appeal = "Court of Appeal";
export const court_supreme = "Supreme court";

// Regions
export const region_nigeria = "ng";
export const region_liberia = "lbr";
export const region_senegal = "sen";
export const region_ghana = "gha";

// PubSub
export const PUB_SUB_NEW_S_QUERY = "PUB_SUB_NEW_S_QUERY";
