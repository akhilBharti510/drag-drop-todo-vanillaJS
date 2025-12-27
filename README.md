# 🧲 Drag & Drop To-Do App (Vanilla JavaScript)

A **production-grade Drag & Drop To-Do application** built using **pure HTML, CSS, and Vanilla JavaScript** — no frameworks, no libraries.

👉 Live Demo:  
🔗 https://akhilbharti510.github.io/drag-drop-todo-vanillaJS/

---

## 🚀 Features

### 📝 Task Management
- Add tasks manually
- Delete tasks directly from **Todo** (without completing)
- Delete completed tasks from **Done**

### 🖱️ Drag & Drop
- Drag tasks from **Todo → Done** to mark them completed
- One-way flow to enforce clear task lifecycle

### ⏱️ Time Tracking
- Task **Created Timestamp**
- Task **Completed Timestamp**
- **Duration** (time taken to complete a task)

### ♻️ Undo Support
- Move tasks back from **Done → Todo** using Undo

### 🔍 Search
- Real-time search across **Todo & Done**
- Case-insensitive filtering

### 💾 Persistence
- App state stored in **localStorage**
- Tasks remain intact after refresh / reload

### 🎨 UI / UX
- Clean dark UI
- High contrast completed tasks
- No accidental styling bugs (buttons unaffected)
- Keyboard accessible (Enter / Delete support)

---

## 🧠 Technical Highlights

- **HTML5 Drag & Drop API**
- **State-driven architecture**
- DOM ↔ Data synchronization
- Event delegation & keyboard accessibility
- Zero dependencies (Vanilla JS only)

---

## 🗂️ Project Structure

drag-drop-todo-vanillaJS/
├── index.html
├── style.css
└── script.js


---

## 📦 How to Run Locally

```bash
git clone https://github.com/akhilbharti510/drag-drop-todo-vanillaJS.git
cd drag-drop-todo-vanillaJS
open index.html


(Or just use Live Server in VS Code)