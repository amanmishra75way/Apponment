import { Request, Response } from "express";
import * as service from "./availability.service";
import { createAvailabilitySchema } from "./availability.validation";

export const create = async (req: Request, res: Response) => {
  const { error } = createAvailabilitySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const result = await service.createAvailability(req.body);
  res.status(201).json(result);
};

export const getAvailability = async (req: Request, res: Response) => {
  const { staffId, date } = req.query;

  if (!staffId || !date) {
    return res.status(400).json({ error: "staffId and date are required" });
  }

  const availability = await service.getAvailabilityByStaffAndDate(staffId as string, date as string);

  res.json(availability || { slots: [] });
};
