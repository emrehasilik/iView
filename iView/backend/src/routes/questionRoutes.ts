import { Router } from "express";
import {
  getQuestionPackages,
  createQuestionPackage,
  updateQuestionPackage,
  deleteQuestionPackage,
  addQuestionToPackage,
  removeQuestionFromPackage,
  getQuestionPackageById
} from "../controllers/questionController";

const router = Router();

router.get('/question-packages', getQuestionPackages);          // Get all question packages
router.get('/question-package/:packageId', getQuestionPackageById); // Get a specific question package by ID
router.post('/question-package', createQuestionPackage);         // Create a new question package
router.put('/question-package/:id', updateQuestionPackage);      // Update a question package by ID
router.delete('/question-package/:id', deleteQuestionPackage);   // Delete a question package by ID
router.post('/question-package/:packageId/question', addQuestionToPackage); // Add a question to a package
router.delete('/question-package/:packageId/question/:questionId', removeQuestionFromPackage); // Remove a question from a package

export default router;
