import express from "express";
import adminController from "./admin.controller.js";

const router = express.Router();

router.get("/", adminController.getAdmin);

router.post("/newAdmin", adminController.createAdmin);

router.put("/password", adminController.updatePassword);

router.get("/getAll", adminController.getAdmins);

export default router;
