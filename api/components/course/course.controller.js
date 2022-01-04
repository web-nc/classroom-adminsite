import User from "../user/user.model.js";
import Course from "./course.model.js";

export default {
  getCourses: (req, res) => {
    Course.find()
      .sort({ createdDate: 1 })
      .lean()
      .exec((err, courses) => {
        if (err) return res.status(500).json(err);
        const newCourses = courses.map(async (course) => {
          const students = await User.find({ _id: { $in: course.students } });
          const teachers = await User.find({ _id: { $in: course.teachers } });
          const owner = await User.findOne({ _id: course.owner });
          course.owner = owner.lastname + " " + owner.firstname;
          course.students = students.map((student) => ({
            name: student.lastname + " " + student.firstname,
          }));
          course.teachers = teachers.map((teacher) => ({
            name: teacher.lastname + " " + teacher.firstname,
          }));
          course.amountStudent = students.length;
          course.amountTeacher = teachers.length;
          return course;
        });
        Promise.all(newCourses).then((result) => {
          return res.status(200).json(result);
        });
      });
  },
};
