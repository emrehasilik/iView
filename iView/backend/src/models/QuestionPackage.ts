import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface Question {
  _id: ObjectId; // Burada _id'yi belirttik
  question: string;
  minutes: number;
}

interface QuestionPackage extends Document {
  title: string;
  questions: Question[];
}

const questionSchema = new Schema({
  question: { type: String, required: true },
  minutes: { type: Number, required: true },
});

const questionPackageSchema = new Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
});

export default mongoose.model<QuestionPackage>("QuestionPackage", questionPackageSchema);
