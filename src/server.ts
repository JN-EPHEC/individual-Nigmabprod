import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server log machin on http://localhost:${PORT}`);
});

const etudiants = [
  { id: 1, nom: "Dupont", prenom: "Jean" },
  { id: 2, nom: "Martin", prenom: "Sophie" },
  { id: 3, nom: "Doe", prenom: "John" },
];

app.get('/api/data', (req, res) => {
  res.json(etudiants);
});

app.get('/api/hello/:name',(req, res) => {
  const nom = req.params.name;
  if (nom == "Yves") {res.json({ "message": "Bonjour Yves", "timestamp":"2026-01-29T12:00:19.821Z" })}

});
