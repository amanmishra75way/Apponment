import express from "express";
import userRoutes from "./user/user.route";
import appointmentRoutes from "./appoinment/appointment.route";
import availabilityRoutes from "./availability/availability.route";
import holidayRoutes from "./holiday/holiday.route";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/availability", availabilityRoutes);
router.use("/holidays", holidayRoutes);

export default router;
