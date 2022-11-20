import { Router } from "express";
import {
  deleteTransactions,
  getTransactions,
  postTransactions,
  putTransactions,
} from "../controllers/transactions.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { transactionsValidation } from "../middlewares/transactionsValidation.middleware.js";

const router = Router();

router.use(authValidation);

router.get("/transacoes", getTransactions);

router.delete("/transacoes/:id", deleteTransactions);

router.use(transactionsValidation);

router.post("/transacoes", postTransactions);

router.put("/transacoes/:id", putTransactions);

export default router;
