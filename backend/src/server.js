import express from "express";
import router from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/business-tracker", router);

connectDB().then(() => {
  app.listen(6001, () => {
    console.log("server starting on 6001");
  });
});
