import { Router } from "express";
import {
  deleteTransactions,
  getTransactions,
  postTransactions,
  putTransactions,
} from "../controllers/transactions.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { idTransactionExists, transactionsValidation } from "../middlewares/transactionsValidation.middleware.js";

const router = Router();

router.use(authValidation);

router.get("/transacoes", getTransactions);

router.delete("/transacoes/:id",idTransactionExists, deleteTransactions);

router.use(transactionsValidation);

router.post("/transacoes", postTransactions);

router.put("/transacoes/:id",idTransactionExists, putTransactions);

export default router;
