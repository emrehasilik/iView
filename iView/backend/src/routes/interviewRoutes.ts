import { Router } from "express";
import {
  getAllInterviews,
  addInterview,
  updateInterview,
  deleteInterview
} from "../controllers/interviewController";

const router = Router();

router.get('/interviews', getAllInterviews);
router.post('/interviews', addInterview);
router.put('/interviews/:id', updateInterview);
router.delete('/interviews/:id', deleteInterview);

export default router;
