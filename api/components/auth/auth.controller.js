import jwt from "jsonwebtoken";
import Admin from "../admin/admin.model.js";
import bcrypt from "bcryptjs";
import { sendPasswordChangeEmail } from "../../modules/nodemailer/index.js";
import randomstring from "randomstring";

export default {
  login: (req, res, next) => {
    const token = jwt.sign({ _id: req.user._id }, process.env.AUTH_SECRET);
    res.json({
      token: token,
    });
  },

  sendPasswordChangeEmail: async (req, res, next) => {
    const user = await Admin.find({ email: `${req.body.email}` }).lean();
    if (!user.length) {
      return res.status(202).json({ message: "Email không tồn tại" });
    }
    const receiver = user.pop();
    const isSocialAccount = receiver.password === "";
    if (isSocialAccount) {
      return res.status(202).json({ message: "Tài khoản không hợp lệ" });
    }

    const token = randomstring.generate(12);

    sendPasswordChangeEmail(receiver, token).then(async (result) => {
      if (result) {
        await Admin.findByIdAndUpdate(receiver._id, { changePasswordToken: token });
        return res.status(200).json({ message: "Gửi thành công" });
      } else {
        return res.status(202).json({ message: "Gửi thất bại" });
      }
    });
  },

  getAdminChangePassword: async (req, res, next) => {
    const userId = req.params.id;
    // Check id legit
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(202).json({ message: `ID không hợp lệ` });
    }

    const { token } = req.query;
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(202).json({ message: "Tài khoản không tồn tại" });
    }
    if (user.changePasswordToken !== token) {
      return res.status(202).json({ message: "Token không hợp lệ" });
    }

    return res.status(200).json({ email: user.email });
  },

  changePassword: async (req, res, next) => {
    const { userId, token, newPassword } = req.body;
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(202).json({ message: "Tài khoản không tồn tại" });
    }
    if (user.changePasswordToken !== token) {
      return res.status(202).json({ message: "Token không hợp lệ" });
    }

    user.changePasswordToken = "";

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.save();
    return res.status(200).json({ message: "Cập nhật thành công" });
  },
};
