
const express = require("express");
const app = express();

const fs = require("fs");

app.use(express.static('public'))


var PORT = process.env.PORT || 8080


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("./assets"));


require("./routes/html-routes")(app);
require("./routes/api-routes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});