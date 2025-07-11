import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    serviceType: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled", "rescheduled"],
      default: "booked",
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
