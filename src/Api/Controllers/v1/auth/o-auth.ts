import * as express from "express";
import { authenticate } from "passport";
import v1_ApiRoutes from "../../../Contracts/v1/ApiRoutes";
import {
  facebook,
  microsoft,
  google,
  twitter,
  profile,
  linkedin,
  email,
} from "../../../../Utils/constants";
const router = express.Router();

const v1 = new v1_ApiRoutes();

// Handle Twitter O-Auth: "/api/v1/oauth/twitter" : "/auth/twitter/callback"
router.get(v1.oauth().twitter, authenticate(twitter));

// Handle Google O- Auth: "/api/v1/oauth/google" : "/auth/google/callback"
router.get(
  v1.oauth().google,
  authenticate(google, { scope: [profile, email] })
);

// Handle Facebook O- Auth: "/api/v1/oauth/facebook" : "/auth/facebook/callback"
router.get(v1.oauth().facebook, authenticate(facebook, { scope: [email] }));

// Handle Microsoft O- Auth: "/api/v1/oauth/microsoft" : "/auth/microsoft/callback"
router.get(v1.oauth().microsoft, authenticate(microsoft));

// Handle Linkedin O- Auth: "/api/v1/oauth/linkedin" : "/auth/linkedin/callback"
router.get(
  v1.oauth().linkedin,
  authenticate(linkedin, {
    scope: ["r_emailaddress", "r_liteprofile"],
  })
);

export default router;
