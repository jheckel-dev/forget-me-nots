const fs = require("fs");

const PATH = "./db/db.json";

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    // Read file
    const notes = JSON.parse(fs.readFileSync(PATH, "utf-8"));

    // Return data
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    // Read file
    const notes = JSON.parse(fs.readFileSync(PATH, "utf-8"));

    // Set variable for the body of the new note
    const newNote = req.body;

    // set id
    newNote.id = notes.length + 1;

    notes.push(newNote);
    // write notes variable to the file

    // wrting note to db.json file
    fs.writeFile(PATH, JSON.stringify(notes), function (err) {
      if (err) return console.log(err);
    });
    // returning note t

    res.json(notes);
  });

  app.delete("/api/notes/:id", function (req, res) {
    // Read file
    const notes = JSON.parse(fs.readFileSync(PATH, "utf-8"));

    // Set the note to delete
    const noteToDelete = req.params.id - 1;

    // Use splice to remove note
    notes.splice(noteToDelete, 1);

    // Write the file
    fs.writeFile(PATH, JSON.stringify(notes), function (err) {
      if (err) return console.log(err);
    });

    // return notes 
    res.json(notes);
  });
};