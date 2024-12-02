const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

const people = require("./json/people.json");

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/people", (req, res) => {
  res.json(people);
});

app.get("/people/:index", (req, res) => {
  res.json(people[req.params.index]);
});

app.post("/people", (req, res) => {
  people.push(req.body);
  res.json(req.body);
});

app.put("/people/:index", (req, res) => {
  const index = req.params.index;
  const updatedPerson = req.body;

  if (index >= 0 && index < people.length) {
    people[index] = updatedPerson;
    res.json({ message: "Persona actualizada", data: updatedPerson });
  } else {
    res.status(404).json({ error: "Índice fuera de rango" });
  }
});

app.delete("/people/:index", (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < people.length) {
    const deletedPerson = people.splice(index, 1);
    res.json({ message: "Persona eliminada", data: deletedPerson });
  } else {
    res.status(404).json({ error: "Índice fuera de rango" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
