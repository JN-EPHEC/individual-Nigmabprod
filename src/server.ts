import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server log machin on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });

const etudiants = [
  { id: 1, nom: "Dupont", prenom: "Jean" },
  { id: 2, nom: "Martin", prenom: "Sophie" },
  { id: 3, nom: "Doe", prenom: "John" },
];

app.get('/api/data', (req, res) => {
  res.json(etudiants);
});

app.get('/api/hello/:name', (req, res) => {
  const name = req.params.name;
  const timestamp = new Date().toISOString();
  res.json({ message: `Bonjour ${name}`, timestamp });
});

app.use(userRoutes);
