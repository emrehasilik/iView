import mongoose, { Schema, Document } from "mongoose";

interface PersonelInformation extends Document {
  name: string;
  surname: string;
  email: string;
  phone: string;
  isApproved: boolean;
}

const personelInformationSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  isApproved: { type: Boolean, required: true },
});

export default mongoose.model<PersonelInformation>("PersonelInformation", personelInformationSchema);
