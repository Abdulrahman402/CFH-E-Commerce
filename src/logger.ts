import { Logger, ILogObj } from "tslog";
import * as fs from "fs";

const logFile = fs.createWriteStream("app.log", { flags: "a" });

const logger: Logger<ILogObj> = new Logger({ type: "json" });

export default logger;
