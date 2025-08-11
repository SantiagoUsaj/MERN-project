import express from "express";
import * as UserController from "../controllers/users.js";

const router = express.Router();

router.post("/signup", UserController.signUp);

export default router;
