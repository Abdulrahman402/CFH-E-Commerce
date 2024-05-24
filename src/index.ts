import express from "express";
import * as http from "http";
import logger from "./logger";
import "./env_var";
import { connectDB } from "./db/connection";
import { routes } from "./routes/router";

connectDB();

const app = express();
const server = http.createServer(app);

routes(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
