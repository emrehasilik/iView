import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface AdminLogin extends Document {
  username: string;
  password: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const adminLoginSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Şifreyi kaydetmeden önce hashleme işlemi
adminLoginSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Şifre doğrulama metodu
adminLoginSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<AdminLogin>("AdminLogin", adminLoginSchema);
