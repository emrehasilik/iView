import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongoose";

interface Interview extends Document {
  title: string;
  selectedPackages: ObjectId[]; // ObjectId ile tut
  expireDate: Date;
}

const interviewSchema = new Schema({
  title: { type: String, required: true },
  selectedPackages: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuestionPackage", required: true }], // ref ile referans oluştur
  expireDate: { type: Date, required: true },
});

export default mongoose.model<Interview>("Interview", interviewSchema);
