import { log } from "../services/logging";

export const testRoute = {
  path: "/api/test",
  method: "get",
  handler: (req, res) => {
    log("Test route called!");
    res.status(200).send("It works!");
  },
};
