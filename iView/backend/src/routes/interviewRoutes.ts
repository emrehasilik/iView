import { Router } from "express";
import { getAllInterviews, addInterview, updateInterview, deleteInterview } from "../controllers/interviewController";

const router = Router();

router.get('/interviews', getAllInterviews);           // Get all interviews
router.post('/interviews', addInterview);              // Create a new interview
router.put('/interviews/:id', updateInterview);        // Update an interview by ID
router.delete('/interviews/:id', deleteInterview);     // Delete an interview by ID

export default router;
