import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';

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

const port = 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));