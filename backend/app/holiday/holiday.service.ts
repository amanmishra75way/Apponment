import Holiday from "./holiday.schema";

export const addHoliday = async (date: string, reason: string) => {
  return await Holiday.create({ date, reason });
};

export const getHolidays = async () => {
  return await Holiday.find({});
};

export const isHoliday = async (date: string) => {
  return await Holiday.findOne({ date });
};

export const deleteHoliday = async (date: string) => {
  return await Holiday.findOneAndDelete({ date });
};
