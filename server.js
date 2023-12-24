const express = require("express");
const bodyParser = require('body-parser');
const mainConfig = require("./config.js");
const {orderRoutes} = require("./routers/router");


const app = express();

app.use(bodyParser.json());
app.use(express.json());


app.use(`/${dir2}`, orderRoutes);

app.listen(8000);