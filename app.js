//Selectors
const todoInput = document.querySelector('.todo-inpt');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-lst');
const filterOption = document.querySelector('.filter-todo');

//Event Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
        //Prevent form from submitting 
    event.preventDefault();
    //TODO DIV
    const todoDiv = document.createElement('div'); //.createElement - creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized
    todoDiv.classList.add("todo");

    //CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value)

    //COMPLETED BUTTON 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST 
    todoList.appendChild(todoDiv);

    //Clear Todo INPUT value
    todoInput.value = "";
}

// Function that can delete task (item)
function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement; //Tworzy nowy 'kontener' z informacją, że item jest częścią większego elementu, który chcemy skasować.
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    //Item checked
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

// Function that can handle filters
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
            break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
            break;
        }
    });
}

function saveLocalTodos(todo) {
    //CHECK---- HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null ) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //CHECK---- HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null ) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
    //TODO DIV
    const todoDiv = document.createElement('div'); //.createElement - creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized
    todoDiv.classList.add("todo");

    //CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //COMPLETED BUTTON 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //TRASH BUTTON 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST 
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) { 

    //CHECK---- HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null ) {
    todos = [];
    } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

