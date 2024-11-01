import { Router } from "express";
import { savePersonelInformation, getInterviewQuestions } from "../controllers/personelController";

const router = Router();

router.post("/interview/:interviewId/personel-information", savePersonelInformation);
router.get("/interview/:interviewId/questions", getInterviewQuestions);

export default router;
