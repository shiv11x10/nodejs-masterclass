import express from "express";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import RateLimit from "express-rate-limit";
import * as helmet from "helmet";
import routes from "./src/routes/crmRoutes";

const app = express();
const PORT = 3000;

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// Rate Limit setup - to prevent DoS attack
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

app.use(limiter);

// mongoose connection
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://shivamXI:Shivam1996@cluster0.sab3t.gcp.mongodb.net/security?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// bodyparser setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// JWT setup
// here we have added req.user so that we can verify if user is logged in via loginRequired middkeware
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

// serving static files
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
