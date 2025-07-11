export interface AvailabilityDTO {
  staffId: string;
  date: string;
  slots: {
    time: string;
    isBooked?: boolean;
  }[];
}
