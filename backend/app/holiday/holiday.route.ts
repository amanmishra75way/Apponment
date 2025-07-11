import express from "express";
import * as controller from "./holiday.controller";
import { authMiddleware as isAuthenticated } from "../common/middleware/auth.middleware";
import { isAdmin } from "../common/middleware/AdminCheck.middleware";
const router = express.Router();

router.post("/", isAuthenticated, controller.add);
router.get("/", isAuthenticated, controller.list);
router.delete("/:date", isAuthenticated, isAdmin, controller.remove);

export default router;
