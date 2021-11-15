const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");


const PORT = process.env.PORT || 8080;

app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "public/notes.html"));
    console.log("Your Notes!");

})

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public/index.html"));
    console.log("Your index!");
})

app.get("/api/notes", (request, response) => {

    fs.readFile(path.join(__dirname, "..", "..", "..", "db.json"), function (err, data) {
        console.log("API Notes!");
    })
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});