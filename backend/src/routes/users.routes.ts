import express from "express";
import { check } from "express-validator";
import fileUpload from "../middleware/file-upload";

import { getAllUsers, signup, login } from "../controllers/users.controller";

const router = express.Router();

router.get("/", getAllUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

router.post("/login", login);

export default router;
