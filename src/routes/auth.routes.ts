import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


const router = Router();

router.post('/registr', AuthController.register); /*регистраиция*/

router.post('/login', AuthController.login);

export default router;


