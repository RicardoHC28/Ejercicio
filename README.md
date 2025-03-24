para este ejercicio se debe crear un base de datos 
CREATE DATABASE todolist;
USE todolist;

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);
