import { transactionSchema } from "../model/transictions.model.js";

export function transactionsValidation(req, res, next) {
  const transaction = req.body;
  //transforma data para formato americano
  transaction.date = transaction.date.split("/").reverse().join("/");

  const { error } = transactionSchema.validate(transaction, {
    abortEarly: false,
  });
  if (error) {
    const arrErrors = error.details.map((e) => e.message);
    return res.status(422).send(arrErrors);
  }
  //transforma data para formato brasileiro
  transaction.date = transaction.date.split("/").reverse().join("/");

  next();
}
