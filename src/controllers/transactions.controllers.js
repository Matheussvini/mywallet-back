import { ObjectId } from "mongodb";
import { transactionsCollection } from "../database/db.js";

export async function postTransactions(req, res) {
  const userId = res.locals.user._id;
  const transaction = req.body;

  try {
    await transactionsCollection.insertOne({
      ...transaction,
      userId,
    });
    res.status(201).send({ message: "Transação registrada com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getTransactions(req, res) {
  const user = res.locals.user;
  const userId = res.locals.user._id;

  try {
    const arrTransactions = await transactionsCollection
      .find({ userId })
      .sort({ date: -1 })
      .toArray();

    res.status(200).send(arrTransactions);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function putTransactions(req, res) {
  const transaction = req.body;
  const userId = res.locals.user._id;

  try {
    await transactionsCollection.updateOne({ userId }, { $set: transaction });
    res.status(201).send({ message: "Transação editada com sucesso!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteTransactions(req, res) {
  const id = req.params.id;

  try {
    await transactionsCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).send("Transação apagada com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
