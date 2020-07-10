import passport = require("passport");

declare namespace _LocalAuth {
  interface register {
    first_name: string;
    last_name: string;
    email: string;
    role: number;
    password: string;
    photo?: string;
    phone_number?: string;
  }

  interface login {
    email: string;
    password: string;
  }
}

declare namespace _CommonAuth {
  type type = "this" | "all";

  type password = string;
}

declare namespace _OAuthMiddleWare {
  type strategy = "google" | "twitter" | "facebook" | "microsoft" | "linkedin";

  interface _passportVerify {
    accessToken: string;
    refreshToken: string;
    profile: passport.Profile;
    cb: (error: any, user?: any) => void;
  }
}
