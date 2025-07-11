import { Request, Response } from "express";
import { holidaySchema } from "./holiday.validation";
import * as service from "./holiday.service";

export const add = async (req: Request, res: Response) => {
  const { error } = holidaySchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { date, reason } = req.body;

  const existing = await service.isHoliday(date);
  if (existing) return res.status(400).json({ error: "Date already marked as holiday" });

  const holiday = await service.addHoliday(date, reason);
  res.status(201).json(holiday);
};

export const list = async (_req: Request, res: Response) => {
  const holidays = await service.getHolidays();
  res.json(holidays);
};

export const remove = async (req: Request, res: Response) => {
  const result = await service.deleteHoliday(req.params.date);
  if (!result) return res.status(404).json({ error: "Holiday not found" });
  res.json({ message: "Holiday removed", date: req.params.date });
};
