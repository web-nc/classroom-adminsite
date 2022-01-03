import Admin from "./components/admin/admin.model.js";
import bcrypt from "bcryptjs";

export default async function insert() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash("1", salt);
  const newUser = new Admin({
    email: "classroom.admin@gmail.com",
    password: hashedPassword,
    firstname: "Admin",
    lastname: "",
    gender: "Khác",
    createdDate: new Date(),
  });
  newUser.save();
  console.log("Admin has been created");
}
