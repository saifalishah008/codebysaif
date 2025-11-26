function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  const dateTime = document.getElementById("taskDateTime").value;

  if (!taskText) return alert("Please enter a task");

  const formattedDateTime = dateTime
    ? new Date(dateTime).toLocaleString()
    : "";

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");

  const taskContent = document.createElement("span");
  taskContent.className = "task-text";
  taskContent.textContent = formattedDateTime
    ? `${taskText}  ( ${formattedDateTime} )`
    : taskText;

  const controls = document.createElement("div");
  controls.className = "task-controls";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.onclick = () => taskContent.classList.toggle("completed");

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.onclick = () => {
    const newText = prompt("Edit Task", taskText);
    if (newText) taskContent.textContent = newText;
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => li.remove();

  controls.appendChild(completeBtn);
  controls.appendChild(editBtn);
  controls.appendChild(deleteBtn);

  li.appendChild(taskContent);
  li.appendChild(controls);

  taskList.appendChild(li);

  document.getElementById("taskInput").value = "";
  document.getElementById("taskDateTime").value = "";
}
