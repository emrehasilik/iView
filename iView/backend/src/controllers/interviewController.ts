import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import Interview from "../models/Interview";
import QuestionPackage from "../models/QuestionPackage";

// Get all interviews (Read)
export const getAllInterviews = asyncHandler(async (req: Request, res: Response) => {
  const interviews = await Interview.find();
  res.json(interviews);
});

// Create a new interview
export const addInterview = asyncHandler(async (req: Request, res: Response) => {
  const { title, selectedPackages, expireDate, canSkip } = req.body;

  const validPackages = await QuestionPackage.find({ _id: { $in: selectedPackages } });
  if (validPackages.length !== selectedPackages.length) {
    res.status(400).json({ error: "One or more selected packages are invalid." });
    return;
  }

  const newInterview = new Interview({ title, selectedPackages, expireDate, canSkip });
  await newInterview.save();
  res.json(newInterview);
});

// Update an interview by ID (Update)
export const updateInterview = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, selectedPackages, expireDate, canSkip } = req.body;

  const updatedInterview = await Interview.findByIdAndUpdate(id, { title, selectedPackages, expireDate, canSkip }, { new: true });
  if (!updatedInterview) {
    res.status(404).json({ message: "Interview not found" });
  } else {
    res.status(200).json(updatedInterview);
  }
});

// Delete an interview by ID (Delete)
export const deleteInterview = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedInterview = await Interview.findByIdAndDelete(id);
  if (!deletedInterview) {
    res.status(404).json({ message: "Interview not found" });
  } else {
    res.status(200).json({ message: "Interview deleted successfully" });
  }
});
