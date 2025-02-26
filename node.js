const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use("/", routes);

app.listen(5000, () => {
  console.log("Listening on port 5000....");
});
