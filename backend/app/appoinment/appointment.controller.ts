import { Request, Response } from "express";
import * as service from "./appointment.service";
import { createAppointmentSchema, rescheduleSchema } from "./appointment.validation";
import { sendAppointmentConfirmation, sendAppointmentReminder } from "../common/services/email.service";
import UserModel from "../user/user.schema";
import appointmentSchema from "./appointment.schema";
export const create = async (req: Request, res: Response) => {
  const { error } = createAppointmentSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const appointment = await service.createAppointment(req.body);
  const user = await UserModel.findById(req.body.userId);
  if (user) {
    await sendAppointmentConfirmation(user.email, user.name, req.body.date, req.body.timeSlot);
  }
  res.status(201).json(appointment);
};

export const sendReminder = async (req: Request, res: Response) => {
  const appointment = await appointmentSchema.findById(req.params.id).populate("userId");
  if (!appointment || !appointment.userId) {
    return res.status(404).json({ error: "Appointment or user not found" });
  }
  const user = appointment.userId as any;
  await sendAppointmentReminder(user.email, user.name, appointment.date, appointment.timeSlot);

  res.json({ message: "Reminder email sent" });
};

export const markComplete = async (req: Request, res: Response) => {
  try {
    const result = await service.markAppointmentComplete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark appointment as completed" });
  }
};

export const getUserAppointments = async (req: Request, res: Response) => {
  const appointments = await service.getAppointmentsByUser(req.params.userId);
  res.json(appointments);
};

export const getStaffAppointments = async (req: Request, res: Response) => {
  const appointments = await service.getAppointmentsByStaff(req.params.staffId);
  res.json(appointments);
};

export const cancel = async (req: Request, res: Response) => {
  const result = await service.cancelAppointment(req.params.id);
  res.json(result);
};

export const reschedule = async (req: Request, res: Response) => {
  const { error } = rescheduleSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const result = await service.rescheduleAppointment(req.params.id, req.body.date, req.body.timeSlot);
  res.json(result);
};

export const getAllAppointments = async (req: Request, res: Response) => {
  const appointments = await appointmentSchema.find().populate("userId staffId");
  res.json(appointments);
};
