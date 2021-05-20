const express = require("express");
const { readdirSync }= require ('fs');
const cors = require( "cors");
const  mongoose = require( "mongoose");
const morgan = require("morgan");
const session = require("express-session");


require("dotenv").config();

const app = express();


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// route middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));


if (process.env.NODE_ENV === 'production')
{
  app.use(express.static('../client/build'))
}

const port = process.env.PORT || 5000;

app.listen(process.env.PORT, () => console.log(`Server is running on port ${port}`));
