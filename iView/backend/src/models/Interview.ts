import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongoose";

interface Interview extends Document {
  title: string;
  selectedPackages: ObjectId[];
  expireDate: Date;
  userId: ObjectId[]; // Adayların ID'leri için userId alanını ekliyoruz
}

const interviewSchema = new Schema({
  title: { type: String, required: true },
  selectedPackages: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuestionPackage", required: true }],
  expireDate: { type: Date, required: true },
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "PersonelInformation" }] // Adaylar için referans
});

export default mongoose.model<Interview>("Interview", interviewSchema);
