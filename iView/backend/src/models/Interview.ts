import mongoose, { Schema, Document } from "mongoose";

interface Interview extends Document {
  title: string;
  selectedPackages: string[];
  expireDate: Date;
  canSkip: boolean;
}

const interviewSchema = new Schema({
  title: { type: String, required: true },
  selectedPackages: [{ type: String, required: true }],
  expireDate: { type: Date, required: true },
  canSkip: { type: Boolean, default: false },
});

export default mongoose.model<Interview>("Interview", interviewSchema);
