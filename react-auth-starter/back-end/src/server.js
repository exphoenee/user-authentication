import express from "express";
import { routes } from "./routes";
import { initializeDbConnection } from "./db";
import cors from "cors";
import { log } from "./services/logging";

const PORT = process.env.PORT || 8080;

const app = express();

// avoiding cors error the server runs on localhost port:8080 and the client runs on localhost port:3000
const corsOptions = {
  origin: "*",
  //methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS", "PUT"],
  //allowedHeaders: ["Content-Type", "Authorization", " application/json"],
};

app.use(cors(corsOptions));

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection().then(() => {
  app.listen(PORT, () => {
    log(`Server is listening on port ${PORT}`);
  });
});
