// src/index.ts
import * as http from "http";
import logger from "./logger";
import "./env_var";
import { connectDB } from "./db/connection";

const server = http.createServer();

connectDB();

const port = process.env.PORT;

server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
