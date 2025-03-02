import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db";
import routes from "./routes/v1.router";
import errorMiddleware from "./middleware/errorMiddleware";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.use(errorMiddleware);

app.use("/api/v1/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
