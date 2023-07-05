import { Router } from "express";
import {
    login,
    register,
    logOut,
    profile,
} from "../controllers/authController";
import { authRequired } from "../middleware/validateToken";
import { validateSchema } from "../middleware/validatorMiddelware";
import { registerSchema, loginShema } from "../schemas/authSchema";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginShema), login);
router.post("/logout", logOut);
router.get("/profile", authRequired, profile);

export { router as authRouter };
