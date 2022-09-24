import fs from "fs";
import path from "path";

export const log = async (text) => {
  const logMsg = `${new Date().toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  })}: ${text}`;

  const logDir = "../../serverlog/";

  if (!fs.existsSync(path.join(__dirname, logDir))) {
    fs.mkdirSync(path.join(__dirname, logDir), { recursive: true });
    console.log("Directory created.");
  }

  //write log message to file
  fs.appendFile(
    path.join(__dirname, logDir + "log.txt"),
    logMsg + "\n",
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );

  console.log(logMsg);
};
