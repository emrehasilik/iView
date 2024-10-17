import asyncHandler from 'express-async-handler';
import { Request, Response,   } from 'express';
import QuestionPackage from '../models/QuestionPackage'; // Modeli dahil edelim

// Soru paketlerini listeleme
export const getQuestionPackages = async (req: Request, res: Response) => {
  try {
    const questionPackages = await QuestionPackage.find(); // Tüm soru paketlerini bul
    res.status(200).json(questionPackages); // Başarılı yanıt
  } catch (error) {
    res.status(500).json({ message: 'Soru paketleri alınırken hata oluştu', error });
  }
};

// Soru paketi oluşturma (önceki fonksiyonunuz)
export const createQuestionPackage = async (req: Request, res: Response) => {
  try {
    const { title, questions } = req.body; // Post edilen verileri alıyoruz
    const newQuestionPackage = new QuestionPackage({ title, questions });

    await newQuestionPackage.save(); // Veritabanına kaydediyoruz
    res.status(201).json(newQuestionPackage); // Başarılı yanıt
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi oluşturulurken hata oluştu', error });
  }
};

// Soru paketi silme fonksiyonu
export const deleteQuestionPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const deletedPackage = await QuestionPackage.findByIdAndDelete(id);

    if (!deletedPackage) {
      res.status(404).json({ message: 'Soru paketi bulunamadı' });
      return;
    }

    res.status(200).json({ message: 'Soru paketi başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Soru paketi silinirken hata oluştu', error });
  }
};
