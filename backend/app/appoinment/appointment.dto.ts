export interface AppointmentDTO {
  userId: string;
  staffId: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  notes?: string;
}
