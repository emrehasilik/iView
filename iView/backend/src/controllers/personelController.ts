import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import PersonelInformation from "../models/PersonelInformation";
import Interview from "../models/Interview";

// Aday Bilgilerini Kaydetme
export const savePersonelInformation = asyncHandler(async (req: Request, res: Response) => {
  const { interviewId } = req.params;
  const { name, surname, email, phone, isApproved } = req.body;

  try {
    // Yeni aday kaydı oluşturma
    const newPersonel = new PersonelInformation({ name, surname, email, phone, isApproved });
    await newPersonel.save();
    console.log('Yeni Personel Kaydedildi:', newPersonel);
    
    // Interview dokümanına yeni adayın ID'sini ekle
    await Interview.findByIdAndUpdate(
      interviewId,
      { $push: { userId: newPersonel._id } },
      { new: true }
    );

    res.status(201).json(newPersonel);
  } catch (error) {
    console.error('Personel bilgisi kaydedilirken bir hata oluştu:', error);
    res.status(500).json({ message: 'Personel bilgisi kaydedilemedi.', error });
  }
});



// Interview Soru Paketini Getirme
export const getInterviewQuestions = asyncHandler(async (req: Request, res: Response) => {
  const { interviewId } = req.params;

  const interview = await Interview.findById(interviewId).populate("selectedPackages");

  if (!interview) {
    res.status(404).json({ message: "Interview not found" });
    return;
  }

  const questions = interview.selectedPackages.flatMap((pkg: any) => pkg.questions);
  res.status(200).json(questions);
});
