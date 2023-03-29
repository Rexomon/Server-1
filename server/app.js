const express = require("express");
const errorHandler = require("./middlewares/errorhandler");
const app = express();
const port = 3232;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
