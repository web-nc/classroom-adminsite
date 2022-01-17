import User from "../user/user.model.js";
import Course from "./course.model.js";
import Assignment from "./relatedModels/assignment.model.js";
import Grade from "./relatedModels/grade.model.js";
import Review from "./relatedModels/review.model.js";

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
          course.teachers.push({
            name: owner.lastname + " " + owner.firstname,
          });
          course.amountStudent = students.length;
          course.amountTeacher = teachers.length + 1;
          return course;
        });
        Promise.all(newCourses).then((result) => {
          return res.status(200).json(result);
        });
      });
  },

  deleteCourse: (req, res) => {
    const courseId = req.params.id;
    // Check id legit
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(202).json({ message: `ID không hợp lệ` });
    }

    Course.findByIdAndDelete(courseId).exec(async (err, course) => {
      if (err) return res.status(500).json(err);

      // if course does not exist
      if (!(course && course._id))
        return res.status(202).json({ message: "Lớp học không tồn tại" });

      // from course's _id field we can track down all assignments have a "relationship" to ditch off it
      // then we can remove grades, reviews by the same way with assignments' _id
      const assignments = await Assignment.find({ course: course._id }).lean();
      assignments.forEach(async (doc) => {
        await Grade.deleteMany({ assignment: doc._id });
        await Review.deleteMany({ assignment: doc._id });
      });
      await Assignment.deleteMany({ course: course._id });

      return res.status(200).json({
        courseIdDeleted: course._id,
        message: "Đã xóa thành công lớp học",
      });
    });
  },
};
