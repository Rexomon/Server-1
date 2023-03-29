const express = require("express");
const index = express();
const port = 3232;

index.use(express.json());
index.use(express, urlencoded({ extend: false }));

index.use(require("./routes"));
