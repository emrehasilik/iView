import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import QuestionPackage from "../models/QuestionPackage";

// Get all question packages (Read)
export const getQuestionPackages = asyncHandler(async (req: Request, res: Response) => {
  const questionPackages = await QuestionPackage.find();
  res.status(200).json(questionPackages);
});

// Get a specific question package by ID (Read)
export const getQuestionPackageById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { packageId } = req.params;

  // ObjectId doğrulaması
  if (!mongoose.Types.ObjectId.isValid(packageId)) {
    res.status(400).json({ message: "Geçersiz paket ID" });
    return;
  }

  const questionPackage = await QuestionPackage.findById(packageId);

  if (!questionPackage) {
    res.status(404).json({ message: "Soru paketi bulunamadı" });
    return;
  }

  res.status(200).json(questionPackage);
});

// Create a new question package
export const createQuestionPackage = asyncHandler(async (req: Request, res: Response) => {
  const { title, questions } = req.body;
  const newQuestionPackage = new QuestionPackage({ title, questions });
  await newQuestionPackage.save();
  res.status(201).json(newQuestionPackage);
});

// Update a question package by ID (Update)
export const updateQuestionPackage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Geçersiz paket ID" });
    return;
  }

  const { title, questions } = req.body;
  const updatedPackage = await QuestionPackage.findByIdAndUpdate(id, { title, questions }, { new: true });

  if (!updatedPackage) {
    res.status(404).json({ message: "Soru paketi bulunamadı" });
  } else {
    res.status(200).json(updatedPackage);
  }
});

// Delete a question package by ID (Delete)
export const deleteQuestionPackage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Geçersiz paket ID" });
    return;
  }

  const deletedPackage = await QuestionPackage.findByIdAndDelete(id);

  if (!deletedPackage) {
    res.status(404).json({ message: "Soru paketi bulunamadı" });
  } else {
    res.status(200).json({ message: "Soru paketi başarıyla silindi" });
  }
});

// Add a question to a package
export const addQuestionToPackage = asyncHandler(async (req: Request, res: Response) => {
  const { packageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(packageId)) {
    res.status(400).json({ message: "Geçersiz paket ID" });
    return;
  }

  const { question, minutes } = req.body;
  const updatedPackage = await QuestionPackage.findByIdAndUpdate(
    packageId,
    { $push: { questions: { question, minutes } } },
    { new: true }
  );

  if (!updatedPackage) {
    res.status(404).json({ message: "Soru paketi bulunamadı" });
  } else {
    res.status(200).json(updatedPackage);
  }
});

// Remove a question from a package
export const removeQuestionFromPackage = asyncHandler(async (req: Request, res: Response) => {
  const { packageId, questionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(packageId) || !mongoose.Types.ObjectId.isValid(questionId)) {
    res.status(400).json({ message: "Geçersiz ID" });
    return;
  }

  const updatedPackage = await QuestionPackage.findByIdAndUpdate(
    packageId,
    { $pull: { questions: { _id: questionId } } },
    { new: true }
  );

  if (!updatedPackage) {
    res.status(404).json({ message: "Soru paketi bulunamadı" });
  } else {
    res.status(200).json(updatedPackage);
  }
});
