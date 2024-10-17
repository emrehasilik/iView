import { Request, Response } from "express";
import Interview from "../models/Interview";

// Get all interviews
export const getAllInterviews = async (req: Request, res: Response) => {
  try {
    const interviews = await Interview.find();
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching interviews" });
  }
};

// Add a new interview
export const addInterview = async (req: Request, res: Response) => {
  const { title, selectedPackages, expireDate, canSkip, showAtOnce } = req.body;
  try {
    const newInterview = new Interview({ title, selectedPackages, expireDate, canSkip, showAtOnce });
    await newInterview.save();
    res.json(newInterview);
  } catch (error) {
    res.status(500).json({ error: "Error creating interview" });
  }
};
