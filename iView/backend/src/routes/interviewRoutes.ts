import { Router } from "express";
import {
  getAllInterviews,
  addInterview,
  updateInterview,
  deleteInterview
} from "../controllers/interviewController";

const router = Router();

// Get all interviews
router.get('/interviews', getAllInterviews);

// Create a new interview
router.post('/interviews', addInterview);

// Update an interview by ID
router.put('/interviews/:id', updateInterview);

// Delete an interview by ID
router.delete('/interviews/:id', deleteInterview);

export default router;
