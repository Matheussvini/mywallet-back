import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const signUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try {
  await mongoClient.connect();
} catch (err) {
  console.log("Erro no mongo.conect", err);
}

db = mongoClient.db("api-my-wallet");
const usersCollection = db.collection("users");
const sessionsCollection = db.collection("sessions");

// ROTAS:

app.post("/sign-up", async (req, res) => {
  const user = req.body;

  try {
    const { error } = signUpSchema.validate(user, { abortEarly: false });
    if (error) {
      const arrErrors = error.details.map((e) => e.message);
      return res.status(422).send(arrErrors);
    }

    const userExists = await usersCollection.findOne({ email: user.email });
    if (userExists) {
      return res.status(409).send({
        message:
          "Email já cadastrado, por favor efetue o login ou registre outro email",
      });
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await usersCollection.insertOne({ ...user, password: passwordHash });
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
