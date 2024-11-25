import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import AdminLogin from "../models/AdminLogin";
import jwt from "jsonwebtoken";

// Admin giriş işlemi
export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Kullanıcı adı ve şifre kontrolü
  const admin = await AdminLogin.findOne({ username });
  if (admin && (await admin.comparePassword(password))) {
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "secretKey", {
      expiresIn: "1h", // Token 1 saat geçerli
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Yeni admin oluşturma (opsiyonel, test için kullanılabilir)
export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingAdmin = await AdminLogin.findOne({ username });
  if (existingAdmin) {
    res.status(400).json({ message: "Admin with this username already exists." });
    return;
  }

  const newAdmin = await AdminLogin.create({ username, password });
  res.status(201).json(newAdmin);
});
