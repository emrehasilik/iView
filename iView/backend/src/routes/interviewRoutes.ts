import { Router } from "express";
import {
  getAllInterviews,
  addInterview,
  updateInterview,
  deleteInterview,
  getInterviewQuestions, // Yeni eklenen fonksiyon
} from "../controllers/interviewController";

const router = Router();

// Tüm mülakatları getirme
router.get('/interviews', getAllInterviews);

// Yeni bir mülakat oluşturma
router.post('/interviews', addInterview);

// Belirli bir mülakatı güncelleme
router.put('/interviews/:id', updateInterview);

// Belirli bir mülakatı silme
router.delete('/interviews/:id', deleteInterview);

// Belirli bir mülakatın tüm sorularını getirme
router.get('/interview/:interviewId/questions', getInterviewQuestions);

export default router;
