import { Router } from "express";
import { getAllInterviews, addInterview } from "../controllers/interviewController";

const router = Router();

router.get("/", getAllInterviews);
router.post("/", addInterview);

export default router;
