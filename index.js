const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

const MongoStore = require("connect-mongo");

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true, // it would be 'false' in production mode
  outputStyle: 'extended',
  prefix: '/css',
}));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

//extract style and script from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setup the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    //TODO change the secret before deployment in production mode
    secret: "blahSomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        // mongoUrl: db,
        mongoUrl:'mongodb://127.0.0.1/dbname',
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ), 
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
    return;
  }

  console.log(`Server is running on port: ${port}`);
});
