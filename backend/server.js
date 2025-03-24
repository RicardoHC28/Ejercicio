const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Permite peticiones desde el frontend

// Conexión con la base de datos MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // Cambia por tu contraseña
    database: "todolist"
});

// Verificar conexión
db.connect(err => {
    if (err) {
        console.error("Error conectando a la BD:", err);
        return;
    }
    console.log("Conectado a la BD MySQL");
});

// Obtener todas las tareas
app.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tareas", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Agregar una nueva tarea
app.post("/tasks", (req, res) => {
    const { description } = req.body;
    db.query("INSERT INTO tareas (description) VALUES (?)", [description], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send("Tarea agregada");
    });
});

// Eliminar una tarea
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tareas WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send("Tarea eliminada");
    });
});

// Servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
