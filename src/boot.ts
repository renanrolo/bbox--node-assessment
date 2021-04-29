import express, { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
const { ValidationError } = require('express-validation')

var usersRoute = require("./users/users.route");
var projectsRoute = require("./projects/projects.route");

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.get("/healthcheck", async (req: Request, res: Response) => {
  res.status(200).json("Health");
});

//Register routes
app.use('/users', usersRoute);
app.use('/projects', projectsRoute);

// error handler express-validation
app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err)
  }

  if(err) {
    return res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: "Internal Server Error",
      },
    });
  }

  return next();
})

// this matches all routes and all methods
app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Not found"
  });
});

const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
});

createConnection()
  .then((_) => console.log("☁ [database]: Database connection established"))
  .catch((error) =>
    console.error(`⚠ [database]: Couldn't connect to the database: ${error}`)
  );
