import randomstring from "randomstring";
import { sendInviteStudentEmail, sendInviteTeacherEmail } from "../../modules/nodemailer/index.js";
import User from "../user/user.model.js";
import Course from "./course.model.js";

export default {
  getCourses: (req, res) => {
    const courses = Course.find().sort({ createdDate: 1 });
    return res.status(200).json(courses);
  },
};
