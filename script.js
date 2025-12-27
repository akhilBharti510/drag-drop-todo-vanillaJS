const todoZone = document.getElementById("todoZone");
const doneZone = document.getElementById("doneZone");
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");

let draggedId = null;
let searchQuery = "";

let state = JSON.parse(localStorage.getItem("todoState")) || {
  todo: [],
  done: []
};

const now = () => new Date().toLocaleString();

/* INIT */
render();

/* ADD TASK */
form.addEventListener("submit", e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  state.todo.push({
    id: Date.now(),
    text,
    createdAt: now()
  });

  input.value = "";
  persist();
  render();
});

/* SEARCH */
searchInput.addEventListener("input", e => {
  searchQuery = e.target.value.toLowerCase();
  render();
});

/* RENDER */
function render() {
  todoZone.innerHTML = "";
  doneZone.innerHTML = "";

  state.todo
    .filter(t => t.text.toLowerCase().includes(searchQuery))
    .forEach(task => todoZone.appendChild(createCard(task, false)));

  state.done
    .filter(t => t.text.toLowerCase().includes(searchQuery))
    .forEach(task => doneZone.appendChild(createCard(task, true)));
}

/* CREATE CARD */
function createCard(task, isDone) {
  const card = document.createElement("div");
  card.className = `card ${isDone ? "done" : ""}`;
  card.draggable = !isDone;
  card.tabIndex = 0;
  card.dataset.id = task.id;

  card.innerHTML = `
    <div class="task-text">${task.text}</div>
    <div class="meta">Created: ${task.createdAt}</div>
    ${task.completedAt ? `<div class="meta">Completed: ${task.completedAt}</div>` : ""}
    ${task.duration ? `<div class="meta">Duration: ${task.duration}</div>` : ""}
  `;

  const actions = document.createElement("div");
  actions.className = "actions";

  if (isDone) {
    const undo = document.createElement("button");
    undo.className = "undo";
    undo.textContent = "Undo";
    undo.onclick = () => undoTask(task.id);
    actions.append(undo);
  }

  const del = document.createElement("button");
  del.className = "delete";
  del.textContent = "Delete";
  del.onclick = () => deleteTask(task.id);

  actions.append(del);
  card.appendChild(actions);

  card.addEventListener("dragstart", () => draggedId = task.id);

  card.addEventListener("keydown", e => {
    if (e.key === "Enter" && !isDone) markTaskDone(task.id);
    if (e.key === "Delete") deleteTask(task.id);
  });

  return card;
}

/* DROP TO COMPLETE */
doneZone.addEventListener("dragover", e => e.preventDefault());

doneZone.addEventListener("drop", () => {
  if (draggedId) markTaskDone(draggedId);
});

/* LOGIC */
function markTaskDone(id) {
  const task = state.todo.find(t => t.id === id);
  if (!task) return;

  const completedAt = now();
  const durationMs = new Date(completedAt) - new Date(task.createdAt);

  state.todo = state.todo.filter(t => t.id !== id);
  state.done.push({
    ...task,
    completedAt,
    duration: formatDuration(durationMs)
  });

  draggedId = null;
  persist();
  render();
}

function undoTask(id) {
  const task = state.done.find(t => t.id === id);
  state.done = state.done.filter(t => t.id !== id);
  delete task.completedAt;
  delete task.duration;
  state.todo.push(task);
  persist();
  render();
}

function deleteTask(id) {
  state.todo = state.todo.filter(t => t.id !== id);
  state.done = state.done.filter(t => t.id !== id);
  persist();
  render();
}

function formatDuration(ms) {
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  return min ? `${min} min ${sec % 60} sec` : `${sec} sec`;
}

function persist() {
  localStorage.setItem("todoState", JSON.stringify(state));
}
