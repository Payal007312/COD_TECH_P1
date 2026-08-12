const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}

taskForm.onsubmit = e => {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
};

renderTasks();
