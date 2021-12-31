import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

// load up the admin controller
import Admin from "../../components/admin/admin.model.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async function (username, password, done) {
      const admin = await Admin.findOne({ email: `${username}` });
      if (admin) {
        let check = false;
        check = await bcrypt.compareSync(password, admin.password);
        if (check) {
          return done(null, admin);
        } else {
          return done(null, false, { message: "Mật khẩu không đúng!" });
        }
      } else return done(null, false, { message: "Email không đúng!" });
    }
  )
);

var opts = {};
(opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()), (opts.secretOrKey = process.env.AUTH_SECRET);
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    Admin.findOne({ _id: jwt_payload._id }, function (err, admin) {
      if (err) {
        return done(err, false);
      }
      if (admin) {
        done(null, admin);
      } else {
        done(null, false);
      }
    });
  })
);

export default passport;
