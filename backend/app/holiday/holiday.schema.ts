import mongoose from "mongoose";

const HolidaySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Holiday", HolidaySchema);
