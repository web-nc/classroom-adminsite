import bcrypt from "bcryptjs";
import Admin from "./admin.model.js";
export default {
  getAdmin: (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
  },

  updatePassword: async (req, res) => {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;
    if (user) {
      let check = false;
      check = await bcrypt.compareSync(currentPassword, user.password);
      if (check) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.save();
        return res.status(200).json("Cập nhật thành công");
        // return done(null, user);
      } else {
        return res.status(404).json("Mật khẩu không đúng!");
      }
    } else return res.status(404).json("Lỗi tài khoản");
  },

  // get all administrator accounts sorted by date
  getAdmins: (req, res) => {
    Admin.find()
      .sort({ createdDate: 1 })
      .lean()
      .exec((err, admins) => {
        if (err) return res.status(500).json(err);

        admins = admins.map((admin) => {
          admin.fullname = admin.firstname + " " + admin.lastname;
          return admin;
        });
        return res.status(200).json(admins);
      });
  },

  createAdmin: async (req, res) => {
    const user = await Admin.find({ email: `${req.body.email}` });
    if (user.length) {
      return res.status(401).send({ message: "Email đã tồn tại." });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new Admin({
        email: req.body.email,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender ? req.body.gender : "Khác",
        createdDate: new Date(),
      });
      newUser.save();
      return res.status(200).json({ message: "Tạo tài khoản quản trị thành công" });
    }
  },
};
