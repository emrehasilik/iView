import { Request, Response, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import Interview from "../models/Interview";
import QuestionPackage from "../models/QuestionPackage";
import { ObjectId } from "mongoose";

// Get all interviews (Read)
export const getAllInterviews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const interviews = await Interview.find()
    .populate({
      path: 'selectedPackages',
      populate: {
        path: 'questions' // Soru paketlerindeki soruları da getir
      }
    });

  res.json(interviews);
});

// Get questions for a specific interview
export const getInterviewQuestions = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { interviewId } = req.params;

  try {
    // Interview dokümanını ve ilişkili soru paketlerindeki soruları getir
    const interview = await Interview.findById(interviewId).populate({
      path: 'selectedPackages',
      populate: {
        path: 'questions', // Soru paketlerindeki soruları da getir
      },
    });

    if (!interview) {
      res.status(404).json({ message: "Interview not found" });
      return;
    }

    // Soruları tek bir listeye düzleştirin ve any türü olarak belirtin
    const questions = (interview.selectedPackages as any).flatMap((pkg: any) => pkg.questions);
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching interview questions", error });
  }
});

// Create a new interview
export const addInterview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { title, selectedPackages, expireDate } = req.body;

  // Validasyon için soru paketlerinin kontrolü
  const validPackages = await QuestionPackage.find({ _id: { $in: selectedPackages } });
  if (validPackages.length !== selectedPackages.length) {
    res.status(400).json({ error: "One or more selected packages are invalid." });
    return;
  }

  // Yeni mülakat oluşturma
  const newInterview = new Interview({ title, selectedPackages, expireDate });
  await newInterview.save();
  res.status(201).json(newInterview);
});

// Update an interview by ID (Update)
export const updateInterview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, selectedPackages, expireDate } = req.body;

  // Validasyon için soru paketlerinin kontrolü
  const validPackages = await QuestionPackage.find({ _id: { $in: selectedPackages } });
  if (validPackages.length !== selectedPackages.length) {
    res.status(400).json({ error: "One or more selected packages are invalid." });
    return;
  }

  // Mülakat güncelleme
  const updatedInterview = await Interview.findByIdAndUpdate(id, { title, selectedPackages, expireDate }, { new: true });
  if (!updatedInterview) {
    res.status(404).json({ message: "Interview not found" });
  } else {
    res.status(200).json(updatedInterview);
  }
});

// Delete an interview by ID (Delete)
export const deleteInterview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedInterview = await Interview.findByIdAndDelete(id);
  if (!deletedInterview) {
    res.status(404).json({ message: "Interview not found" });
  } else {
    res.status(200).json({ message: "Interview deleted successfully" });
  }
});
