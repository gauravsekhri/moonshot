import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, required: false },
    isAdmin: { type: Boolean, required: false },
    isKeyAdmin: { type: Boolean, required: false },
    isActive: { type: Boolean, required: false },
    lastActiveTime: { type: Date, default: new Date() },
  },
  { timestamps: true },
);

export interface User extends mongoose.Document {
  id: Number;
  fullName: String;
  email: String;
  password: String;
  isEmailVerified: Boolean;
  isAdmin: Boolean;
  isKeyAdmin: Boolean;
  isActive: Boolean;
  lastActiveTime: Date;
}
