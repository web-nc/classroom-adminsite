import User from "./user.model.js";
export default {
  getUser: (req, res) => {
    const userId = req.params.id;
    // Check id legit
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(202).json({ message: `ID không hợp lệ` });
    }

    const user = User.findById(userId);
    if (!user) {
      return res.status(202).json({ message: "Tài khoản không tồn tại" });
    }

    return res.status(200).json(user);
  },

  getUsers: (req, res) => {
    User.find()
      .sort({ createdDate: 1 })
      .lean()
      .exec((err, users) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(users);
      });
  },

  banUser: (req, res) => {
    const userId = req.params.userId;

    User.findByIdAndUpdate(userId, { isBanned: true }).exec((err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(202).json({ message: "Tài khoản không tồn tại" });
      }
      return res.status(200).json({ message: "Khóa tài khoản thành công" });
    });
  },

  unbanUser: (req, res) => {
    const userId = req.params.userId;

    User.findByIdAndUpdate(userId, { isBanned: false }).exec((err, user) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(202).json({ message: "Tài khoản không tồn tại" });
      }
      return res.status(200).json({ message: "Mở khóa tài khoản thành công" });
    });
  },

  updateStudentID: (req, res) => {
    const userId = req.params.userId;
    const studentID = req.body.studentID;
    User.find({ studentID: studentID })
      .lean()
      .exec(async (error, result) => {
        if (error) {
          return res.status(500).json(error);
        }
        let check = false; //check có phải chính nó không
        if (result.length === 1) {
          if (JSON.parse(JSON.stringify(result[0]._id)) === userId) {
            check = true;
          }
        }

        if (studentID !== "" && check === false) {
          if (result.length >= 1) {
            return res
              .status(401)
              .json({ message: "Mã số sinh viên đã tồn tại" });
          }
        }

        User.findByIdAndUpdate(userId, { studentID: studentID }).exec(
          (err, user) => {
            if (err) {
              return res.status(500).json(err);
            }
            if (!user) {
              return res
                .status(202)
                .json({ message: "Tài khoản không tồn tại" });
            }
            return res
              .status(200)
              .json({ message: "Cập nhật MSSV thành công" });
          }
        );
      });
  },
};
