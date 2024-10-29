import mongoose, { Schema, Document } from "mongoose";

interface Interview extends Document {
  title: string;
  selectedPackages: string[];
  expireDate: Date;
}

const interviewSchema = new Schema({
  title: { type: String, required: true },
  selectedPackages: [{ type: String, required: true }],
  expireDate: { type: Date, required: true },
});

export default mongoose.model<Interview>("Interview", interviewSchema);
