import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  userId: Joi.string().required(),
  staffId: Joi.string(),
  serviceType: Joi.string().required(),
  date: Joi.string().required(),
  timeSlot: Joi.string().required(),
  notes: Joi.string().optional(),
});

export const rescheduleSchema = Joi.object({
  date: Joi.string().required(),
  timeSlot: Joi.string().required(),
});
