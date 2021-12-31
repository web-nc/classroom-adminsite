import express from "express";
import userController from "./user.controller.js";

const router = express.Router();

router.get("/:id", userController.getUser);

router.get("/getAll", userController.getUsers);

router.put("/ban/:userId", userController.banUser);

router.put("/unban/:userId", userController.unbanUser);

//TODO:
//Manually map or unmap the StudentId of an account

export default router;
