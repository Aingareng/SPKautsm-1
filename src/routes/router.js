import express from "express";
import { kuisonerControllers } from "../controller/kuisonerController.js";
import { loginController } from "../controller/loginController.js";
import { insertControllerPasien } from "../controller/pasienInsertController.js";
import { calculateNaiveBayesForPatient } from "../controller/naiveByaesInsert.js";
import { getNaiveBayesResult } from "../controller/naiveBayesResultController.js";

const router = express.Router();

router.get("/getQchat10", async (req, res) => {
  kuisonerControllers(req, res);
});

router.post("/postLogin", async (req, res) => {
  loginController(req, res);
});

router.post("/postPasien", async (req, res) => {
  insertControllerPasien(req, res);
});

router.post("/insertKuisoner", async (req, res) => {
  calculateNaiveBayesForPatient(req, res);
});

router.get("/results/:pasienId", async (req, res) => {
  getNaiveBayesResult(req, res);
});

export default router;
