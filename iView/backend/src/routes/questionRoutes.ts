import express from 'express';
import { deleteQuestionPackage , getQuestionPackages, createQuestionPackage } from '../controllers/questionController';

const router = express.Router();

// Soru paketlerini listeleme rotası (GET)
router.get('/question-packages', getQuestionPackages);

// Soru paketi oluşturan POST rotası
router.post('/question-package', createQuestionPackage);
// Soru paketi silme rotası
router.delete('/question-package/:id', deleteQuestionPackage);



export default router;
