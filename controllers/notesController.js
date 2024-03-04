const Lead = require("../models/note");
const mongoose = require('mongoose'); 

const fetchLeads = async (req, res) => {
  const leads = await Lead.find();

  res.json({ leads });
};

const fetchLead = async (req, res) => {
  const leadId = req.params.id;

  const lead = await Lead.findById(leadId);

  res.json({ lead });
};

const createNote = async (req, res) => {
  const { name, email, phone, companyName, companyType, location } = req.body;

  const note = await Lead.create({
    name, email, phone, companyName, companyType, location
  });

  res.json({ note });
};

const updateLead = async (req, res) => {
  const leadId = req.params.id;

  // Check if the leadId is a valid ObjectId
  if (!mongoose.isValidObjectId(leadId)) {
    return res.status(400).json({ error: 'Invalid lead ID' });
  }

  const { name, email, phone, companyName, companyType, location } = req.body;

  try {
    // Update the lead document
    await Lead.findByIdAndUpdate(leadId, {
      name, email, phone, companyName, companyType, location
    });

    // Retrieve the updated lead document
    const updatedLead = await Lead.findById(leadId);

    res.json({ updatedLead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteLead = async (req, res) => {
  const leadId = req.params.id;

  await Lead.deleteOne({ id: leadId });

  res.json({ success: "Record deleted" });
};

module.exports = {
  fetchLeads,
  fetchLead,
  createNote,
  updateLead,
  deleteLead,
};
