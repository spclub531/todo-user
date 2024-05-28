document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const searchInput = document.getElementById('search-input');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    let todos = [];
    let darkMode = false;
  
    // Add todo
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const description = document.getElementById('todo-description').value;
      const dueDate = document.getElementById('todo-due-date').value;
      const priority = document.getElementById('todo-priority').value;
      const notes = document.getElementById('todo-notes').value;
  
      const todo = {
        id: Date.now(),
        description,
        dueDate,
        priority,
        notes
      };
  
      todos.push(todo);
      renderTodos(todos);
      todoForm.reset();
    });
  
    // Delete todo
    todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-todo')) {
        const todoId = e.target.parentElement.dataset.id;
        todos = todos.filter(todo => todo.id != todoId);
        renderTodos(todos);
      }
    });
  
    // Search todos
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filteredTodos = todos.filter(todo => 
        todo.description.toLowerCase().includes(query) ||
        todo.notes.toLowerCase().includes(query)
      );
      renderTodos(filteredTodos);
    });
  
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.classList.toggle('dark-mode', darkMode);
    });
  
    // Render todos
    function renderTodos(todos) {
      todoList.innerHTML = '';
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = todo.id;
        li.innerHTML = `
          <span>${todo.description} (Due: ${todo.dueDate}, Priority: ${todo.priority})</span>
          <div>
            <button class="delete-todo">Delete</button>
          </div>
        `;
        todoList.appendChild(li);
      });
    }
  });
  