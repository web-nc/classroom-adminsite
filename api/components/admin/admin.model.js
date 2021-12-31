import mongoose from "mongoose";

const Admin = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  firstname: String,
  lastname: String,
  gender: {
    type: String,
    enum: ["Nam", "Nữ", "Khác"],
  },
  changePasswordToken: String,
  createdDate: Date,
});

export default mongoose.model("admin", Admin, "admin");
