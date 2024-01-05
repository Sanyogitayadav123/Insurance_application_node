import mongoose from 'mongoose';
import Insurance from '../model/pgInsuranceModel.js';
// import Insurance from "../model/ insuranceModel.js";

export const postInsuranceController = async (req, res) => {
  try {
    const data = req.body;
    const newApplication = await Insurance.create(data);
    const resumeRoute = `/resume/${newApplication.id}`;
    res.json({ resumeRoute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getInsuranceModelById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ error: 'Insurance id is required' });
    }
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //     return res.status(400).json({ error: 'Insurance id must be mongodb id' });
    // }
    const application = await Insurance.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const putInsurannceController = async (req, res) => {
  try {
    const updatedApplication = await Insurance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updatedApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const InsurancePriceController = (req, res) => {
  const price = Math.floor(Math.random() * 10000) + 1;
  res.json({ price });
};
