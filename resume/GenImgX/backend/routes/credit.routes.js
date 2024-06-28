import { Router } from "express";
import { credits, generate, resetCredits } from "../controllers/credit.controllers.js";
import { validUser } from "../middlewares/userAuth.middleware.js";

const router = Router()

router.post('/generate', validUser, generate)
router.get('/credits', validUser, credits)
router.post('/reset', resetCredits)


export default router