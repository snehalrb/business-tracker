import express from "express";
import router from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();
if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.json());

app.use("/business-tracker", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// if (process.env.NODE_ENV === "production") {
//   // Absolute path to frontend dist folder
//   const frontendPath = path.join(__dirname, "frontend", "dist");

//   // Serve static files
//   app.use(express.static(frontendPath));

//   // Handle SPA routing — send index.html for all non-API requests
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }

connectDB().then(() => {
  app.listen(6001, () => {
    console.log("server starting on 6001");
  });
});
