import Joi from "joi";

export const createAvailabilitySchema = Joi.object({
  staffId: Joi.string().required(),
  date: Joi.string().required(),
  slots: Joi.array()
    .items(
      Joi.object({
        time: Joi.string().required(),
      })
    )
    .required(),
});
