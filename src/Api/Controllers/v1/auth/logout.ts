import * as express from "express";
import { logout_path } from "../../../Contracts/static";
import CommonAuth from "../../../../Services/user_admin_schemas/auth/common";
const router = express.Router();

router.use(logout_path, async (req, res) => {
  const service = new CommonAuth();
  const response_data = await service.logout(req, req.body.type);
  return res.status(response_data.status).json(response_data);
});

export default router;
