let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    let pendingList = document.getElementById("pendingTasks");
    let completedList = document.getElementById("completedTasks");
    pendingList.innerHTML = "";
    completedList.innerHTML = "";
    
    // Sort tasks by priority
    tasks.sort((a, b) => a.priority - b.priority);
    
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.classList.add(task.priorityText);
        li.innerHTML = `<span onclick="toggleComplete(${index})">${task.text} (${task.priorityText})</span>
            <button onclick="deleteTask(${index})">❌</button>`;
        
        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
    
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let taskText = document.getElementById("task").value;
    let priorityText = document.getElementById("priority").value;
    let priorityValue = priorityText === "high" ? 1 : priorityText === "medium" ? 2 : 3;
    if (taskText) {
        tasks.push({ text: taskText, priorityText, priority: priorityValue, completed: false });
        document.getElementById("task").value = "";
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

renderTasks();