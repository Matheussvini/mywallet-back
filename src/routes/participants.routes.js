import {
  signInParticipants,
  signUpParticipants,
} from "../controllers/participants.controllers.js";
import { Router } from "express";

const router = Router();

// ROTAS:

router.post("/sign-up", signUpParticipants);

router.post("/sign-in", signInParticipants);

export default router;
