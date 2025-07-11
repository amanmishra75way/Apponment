import Joi from "joi";

export const holidaySchema = Joi.object({
  date: Joi.string().required(),
  reason: Joi.string().required(),
});
