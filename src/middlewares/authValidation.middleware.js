import { sessionsCollection, usersCollection } from "../database/db.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({
      message:
        'Envie um header na requisição com campo "authorization" com valor "Bearer TokenDoUsuario"!',
    });
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });

    if (!user) {
      return res
        .status(401)
        .send({ message: "Token inválido, faça login novamente." });
    }

    delete user.password;
    res.locals.user = user;
  } catch (err) {
    res.status(500).send(err.message);
  }

  next();
}
