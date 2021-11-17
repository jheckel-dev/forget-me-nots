const express = require("express");
const fs = require("fs");


const app = express();



app.use(express.static('public'))


var PORT = process.env.PORT || 8080

app.use("/assets", express.static("public/assets"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



require("./routes/html-routes")(app);
require("./routes/api-routes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});