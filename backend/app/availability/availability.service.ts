import Availability from "./availability.schema";
import { AvailabilityDTO } from "./availability.dto";

export const createAvailability = async (data: AvailabilityDTO) => {
  return await Availability.create(data);
};

export const getAvailabilityByStaffAndDate = async (staffId: string, date: string) => {
  return await Availability.findOne({ staffId, date });
};

export const updateSlotStatus = async (staffId: string, date: string, time: string, isBooked: boolean) => {
  return await Availability.updateOne(
    { staffId, date, "slots.time": time },
    { $set: { "slots.$.isBooked": isBooked } }
  );
};
