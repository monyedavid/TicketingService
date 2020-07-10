import * as express from "express";
import oAuth from "./o-auth";
import LocalAuth from "./local-auth";
import Logout from "./logout";

import { oauth_path, localAuth_path } from "../../../Contracts/static";

const router = express.Router();

// O-authentication /oauth
router.use(oauth_path, oAuth);
// Local-identity /local/auth
router.use(localAuth_path, LocalAuth);
// Logout
router.use(Logout);

export default router;
