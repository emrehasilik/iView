import { Router } from "express";
import { adminLogin, createAdmin } from "../controllers/adminController";

const router = Router();

// Admin giriş rotası
router.post("/admin/login", adminLogin);

// Yeni admin oluşturma (opsiyonel, test için)
router.post("/admin/create", createAdmin);

export default router;
