import * as mongoose from 'mongoose';

export const ParticipantSchema = new mongoose.Schema(
  {
    day: { type: Date, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    a: { type: Number, required: true },
    b: { type: Number, required: true },
    c: { type: Number, required: true },
    d: { type: Number, required: true },
    e: { type: Number, required: true },
    f: { type: Number, required: true },
  },
  { timestamps: true },
);

export interface Participant extends mongoose.Document {
  id: Number;
  day: Date;
  age: String;
  gender: String;
  a: Number;
  b: Number;
  c: Number;
  d: Number;
  e: Number;
  f: Number;
}
