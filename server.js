const express = require("express");
const path = require("path");


const fs = require("fs");



const app = express();


const port = 8080;
const mainDir = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// our get call to send notes to the notes page
app.get("/notes", function(req, res) {

    res.sendFile(path.join(mainDir, "notes.html"));
});


// out get call to grab the sample notes entered into our db.json
app.get("/api/notes", function(req, res) {

    res.sendFile(path.join(__dirname, "/db/db.json"));
});


// gets the ids from the notes in our db file
app.get("/api/notes/:id", function(req, res) {

    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
});


// routes user back to index page if naything besides notes
app.get("*", function(req, res) {

    res.sendFile(path.join(mainDir, "index.html"));
});


// actually saves the notes and writes them to the db file to be called back
app.post("/api/notes", function(req, res) {


    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueID = (savedNotes.length).toString();
    newNote.id = uniqueID;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);
})


// removes notes from our db file
app.delete("/api/notes/:id", function(req, res) {

    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note: ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })
    
    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})





app.listen(port, function() {
    console.log(`Now listening to port ${port}!`);
})