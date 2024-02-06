import { Schema, model } from "mongoose";
import { INotice } from "./notice.interface";

const noticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Notice = model<INotice>("Notice", noticeSchema);
