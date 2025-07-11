import express from "express";
import * as controller from "./availability.controller";
import { authMiddleware as isAuthenticated } from "../common/middleware/auth.middleware";
import { isAdmin } from "../common/middleware/AdminCheck.middleware";

const router = express.Router();

router.post("/", isAuthenticated, isAdmin, controller.create);
router.get("/", isAuthenticated, controller.getAvailability);

export default router;
