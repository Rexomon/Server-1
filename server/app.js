const express = require("express");
const errorHandler = require("./middlewares/errorhandler");
// const Controller = require("./Controller/index");
const app = express();
const path = require("path"); //used for web routing
const port = 3215;
const routes = require("./routes"); //calling the routes from ./routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use(routes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//route web
app.use("home", express.static(path.join(__dirname, "public")));

//Handling route form
// app.post(`/login`, Controller.userLogin);
// app.post(`/register`, Controller.userRegister);
// app.get(`/userdata`, Controller.userData);

//Err 404 Message
app.use((req, res) => {
    res.status(404);
    res.send(`<center><h1>ERROR WOI</h1></center>`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
