const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    hola: "mundo",
  });
});

app.listen(3000, () => console.log(`Server running on port 3000`));
