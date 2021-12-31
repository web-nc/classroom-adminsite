import express from "express";
const router = express.Router();

import authController from "./auth.controller.js";
import passport from "../../modules/passport/index.js";

router.post("/login", passport.authenticate("local", { session: false }), authController.login);

router.post("/sendPasswordChangeEmail", authController.sendPasswordChangeEmail);

router.get("/loginHelping/getUserChangePassword/:id", authController.getAdminChangePassword);

router.post("/loginHelping/changePassword", authController.changePassword);

export default router;
