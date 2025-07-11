import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String, // format: 'YYYY-MM-DD'
      required: true,
    },
    slots: [
      {
        time: String, // e.g., '10:00 AM'
        isBooked: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Availability", AvailabilitySchema);
