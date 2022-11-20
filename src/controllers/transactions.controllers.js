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
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteTransactions(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}
