import express from "express";
import courseController from "./course.controller.js";

const router = express.Router();

router.get("/", courseController.getCourses);

router.delete("/:id", courseController.deleteCourse);

export default router;
