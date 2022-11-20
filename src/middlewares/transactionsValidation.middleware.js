import { ObjectId } from "mongodb";
import { transactionsCollection } from "../database/db.js";
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

export async function idTransactionExists(req, res, next) {
  const id = req.params.id;
  try {
    const idIncludes = await transactionsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!idIncludes) {
      return res.status(404).send("Não há nenhuma mensagem com esse id");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}
