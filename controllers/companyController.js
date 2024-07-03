import { Company } from "../models/company.js";
import { Parser } from "json2csv";
import fetch from "node-fetch";

export const saveData = async (req, res) => {
  try {
    const { name, description, website } = req.body;
    const company = await Company.create({ name, description, website });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCompanies = async (req, res) => {
  try {
    const { ids } = req.body; // Assuming an array of IDs is sent in the request body
    await Company.destroy({ where: { id: ids } });
    res.status(200).json({ message: "Companies deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const downloadCSV = async (req, res) => {
  try {
    const companies = await Company.findAll();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(companies);
    res.header("Content-Type", "text/csv");
    res.attachment("companies.csv");
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const companyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Dummy function to take a screenshot
    const screenshotUrl = await takeScreenshot(company.website);

    res.status(200).json({ ...company.toJSON(), screenshotUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dummy function for taking a screenshot - you'll need to implement this
async function takeScreenshot(url) {
  // Use a service or library like puppeteer to take a screenshot
  // Returning a placeholder URL for now
  return "https://via.placeholder.com/150";
}
