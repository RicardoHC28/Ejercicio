document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Función para cargar tareas desde el servidor
    const loadTasks = async () => {
        try {
            const response = await fetch("http://localhost:3000/tasks");
            const tasks = await response.json();
            taskList.innerHTML = ""; // Limpiar lista antes de agregar tareas
            tasks.forEach(task => addTaskToDOM(task));
        } catch (error) {
            console.error("Error al cargar tareas:", error);
        }
    };

    // Función para agregar tarea al DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.description}</span>
            <button onclick="deleteTask(${task.id})">❌</button>
        `;
        taskList.appendChild(li);
    };

    // Agregar nueva tarea
    addTaskBtn.addEventListener("click", async () => {
        const description = taskInput.value.trim();
        if (description === "") return alert("Ingresa una tarea válida");

        try {
            const response = await fetch("http://localhost:3000/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description })
            });

            if (response.ok) {
                taskInput.value = "";
                loadTasks(); // Recargar lista
            }
        } catch (error) {
            console.error("Error al agregar tarea:", error);
        }
    });

    // Eliminar tarea
    window.deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
            loadTasks(); // Recargar lista
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
    };

    // Cargar tareas al iniciar
    loadTasks();
});
