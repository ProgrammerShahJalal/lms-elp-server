import mongoose, { Schema, model } from "mongoose";
import { ISettings } from "./settings.interface";

const SettingsSchema = new Schema<ISettings>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Settings = model<ISettings>("Settings", SettingsSchema);
