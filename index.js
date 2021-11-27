const express = require("express");
const logger = require("morgan");
const stockRouter = require("./router/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.sendStatus(400); // Bad request
  }
  next();
});

app.use("/trades", stockRouter);

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

