const express = require("express");
const app = express();
const fs = require("fs");

const path = require("path");


const PORT = process.env.PORT || 8080;

app.get("/notes", (request, response) => {
    response.sendFile(path.join(__dirname, "..", "..", "notes.html"));
    console.log("Your Notes!");

})

