import Appointment from "./appointment.schema";
import { AppointmentDTO } from "./appointment.dto";
export const createAppointment = async (data: AppointmentDTO) => {
  return await Appointment.create(data);
};

export const getAppointmentsByUser = async (userId: string) => {
  return await Appointment.find({ userId });
};

export const getAppointmentsByStaff = async (staffId: string) => {
  return await Appointment.find({ staffId });
};

export const markAppointmentComplete = async (id: string) => {
  return await Appointment.findByIdAndUpdate(id, { status: "completed" }, { new: true });
};

export const cancelAppointment = async (id: string) => {
  return await Appointment.findByIdAndUpdate(id, { status: "cancelled" });
};

export const rescheduleAppointment = async (id: string, date: string, timeSlot: string) => {
  return await Appointment.findByIdAndUpdate(id, {
    date,
    timeSlot,
    status: "rescheduled",
  });
};
