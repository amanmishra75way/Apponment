import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.dto";

const UserSchema: Schema = new Schema<IUser & Document>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
      required: false,
      default: null,
    },
    role: {
      type: String,
      enum: ["ADMIN", "STAFF", "USER"],
      default: "USER",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser & Document>("User", UserSchema);

export default UserModel;
