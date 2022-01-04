import express from "express";
import userController from "./user.controller.js";

const router = express.Router();

router.get("/getAll", userController.getUsers);

router.get("/:id", userController.getUser);

router.put("/ban/:userId", userController.banUser);

router.put("/unban/:userId", userController.unbanUser);

//TODO:
//Manually map or unmap the StudentId of an account
router.put("/updateStudentID/:userId", userController.updateStudentID);

export default router;
