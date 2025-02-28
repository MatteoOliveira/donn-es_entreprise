require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let tasks = []; // Stockage temporaire en mémoire

// 📌 Route pour récupérer toutes les tâches
app.get('/tasks', (req, res) => {
    res.json({ success: true, data: tasks });
});

// 📌 Route pour ajouter une tâche
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ success: false, message: "Le titre est obligatoire" });
    }

    const newTask = { id: tasks.length + 1, title, description, status: 'todo' };
    tasks.push(newTask);
    res.status(201).json({ success: true, data: newTask });
});

// 📌 Route pour mettre à jour une tâche
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { status } = req.body;

    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ success: false, message: "Tâche non trouvée" });
    }

    task.status = status || task.status;
    res.json({ success: true, data: task });
});

// 📌 Route pour supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.json({ success: true, message: "Tâche supprimée" });
});

// 📌 Lancer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
