import * as express from "express";
import { register_path, login_path } from "../../../Contracts/static";
import LocalAuth from "../../../../Services/user_admin_schemas/auth/local-auth/main.class";
import { redis } from "../../../../Services/cache";
const router = express.Router();

/**
 * ok
 * message
 * status
 * error
 */

router.post(register_path, async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const service = new LocalAuth(url);
  const response_data = await service.register(req.body, redis);
  return res.status(response_data.status).json(response_data);
});

router.post(login_path, async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const service = new LocalAuth(url);
  const response_data = await service.login(req.body, req, redis);
  return res.status(response_data.status).json(response_data);
});

export default router;
