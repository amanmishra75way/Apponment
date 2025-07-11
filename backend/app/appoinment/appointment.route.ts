import express from "express";
import * as controller from "./appointment.controller";
import { authMiddleware as isAuthenticated } from "../common/middleware/auth.middleware";
import { isAdmin } from "../common/middleware/AdminCheck.middleware";
const router = express.Router();

router.post("/", isAuthenticated, controller.create);
router.get("/user/:userId", isAuthenticated, controller.getUserAppointments);
router.get("/staff/:staffId", isAuthenticated, controller.getStaffAppointments);
router.put("/:id/reschedule", isAuthenticated, controller.reschedule);
router.put("/:id", isAuthenticated, controller.cancel);
router.post("/:id/send-reminder", isAuthenticated, controller.sendReminder);
router.get("/admin", isAuthenticated, controller.getAllAppointments);
router.put("/:id/complete", isAuthenticated, controller.markComplete);
export default router;
