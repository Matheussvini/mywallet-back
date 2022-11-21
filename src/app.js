import express from "express";
import cors from "cors";
import participantsRouters from "./routes/participants.routes.js";
import transactionsRouters from './routes/transactions.routes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(participantsRouters);
app.use(transactionsRouters);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
