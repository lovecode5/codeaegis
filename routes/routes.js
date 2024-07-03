import { Router } from "express";
import {
  saveData,
  listCompanies,
  deleteCompanies,
  downloadCSV,
  companyDetails,
} from "../controllers/companyController.js";

const router = Router();

router.post("/companies", saveData);
router.get("/companies", listCompanies);
router.delete("/companies", deleteCompanies);
router.get("/companies/csv", downloadCSV);
router.get("/companies/:id", companyDetails);

export default router;
