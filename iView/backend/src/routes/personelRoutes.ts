import { Router } from "express";
import { savePersonelInformation, getInterviewQuestions } from "../controllers/personelController";

const router = Router();

// Aday Bilgilerini Kaydetme Rotası
router.post("/personel-information", savePersonelInformation);

// Interview Soru Paketini Getirme Rotası
router.get("/interview/:interviewId/questions", getInterviewQuestions);

export default router;
