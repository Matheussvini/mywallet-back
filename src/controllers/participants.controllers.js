import { signInSchema, signUpSchema } from "../model/users.model.js";
import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUpParticipants(req, res) {
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const arrErrors = error.details.map((e) => e.message);
    return res.status(422).send(arrErrors);
  }

  try {
    const { name, email, password } = req.body;

    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return res.status(409).send({
        message:
          "Email já cadastrado, por favor efetue o login ou registre outro email",
      });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    await usersCollection.insertOne({ name, email, password: passwordHash });
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signInParticipants(req, res) {
  const { error } = signInSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const arrErrors = error.details.map((e) => e.message);
    return res.status(422).send(arrErrors);
  }

  try {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message:
          "Email não cadastrado, por favor verifique o email ou cadastre-se.",
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = uuidV4();
      await sessionsCollection.insertOne({
        token,
        userId: user._id,
      });
      res.status(200).send({ token });
    } else {
      res.status(401).send({
        message: "Senha incorreta, verifique sua senha e tente novamente.",
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}
