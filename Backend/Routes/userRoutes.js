import express from "express"
import { RegisterUser, LoginUser } from "../Controllers/userController.js"
const router = express.Router()

router.post('/register', RegisterUser);
router.post('/login', LoginUser);

export default router;