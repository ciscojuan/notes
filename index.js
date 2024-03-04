const express = require("express");
const cors = require('cors')
const PORT = process.env.PORT || 3001
const app = express();

app.use(cors())
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.status(200).json({ message: "notes loaded", notes: notes });
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.status(200).json({ message: "note found", note: note });
  } else {
    res.status(404).json({ message: "note not found" });
  }
});

const generatedId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.post('/api/notes', (req,res) => {

    const body = req.body
    
    if(!body.content){
    return  res.status(400).json({ error: "content missing" })
    }  

    const note = {
        id : generatedId(),
        content: body.content,
        important: Boolean (body.important) || false
    }
    notes = [...notes, note]
    //notes.concat(note))
    res.status(201).json({ message: "note created", note: note })
})

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    notes.filter((note) => note.id !== id);
    res.status(204).json({ message: "note deleted" });
  } else {
    res.status(404).json({ message: "note not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
