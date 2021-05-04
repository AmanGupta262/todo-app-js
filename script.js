// selectors
const input = document.querySelector('#todo-content');
const submitBtn = document.querySelector('#add-todo');
const completeAll = document.querySelector('.complete-all');
const clearCompleted = document.querySelector('.clear-completed');
const todoList = document.querySelector('.todo-list');
const totalTodos = document.querySelector('#total');
const showBtns = document.querySelectorAll('.show');




// event listeners
submitBtn.addEventListener('click', addTodo);
completeAll.addEventListener('click', completeAllTodo);
showBtns.forEach(show => {
    show.addEventListener('click', showTodos);
});
clearCompleted.addEventListener('click', deleteCompletedTodos);
document.addEventListener("DOMContentLoaded", fetchTodos);

// Functions
function addTodo(e, todo, status){
    if(e)
        e.preventDefault();
    let value;
    if(todo){
        value = todo;
    }
    else{
        value = input.value.trim();
    }
    if(!value){
        input.value = '';
        return;
    }
    const newTodo = document.createElement('div');
    let radio = '';
    if(status){
        radio = 'radio_button_checked';
        newTodo.classList.add('todo', 'd-flex', 'completed');
    }
    else{
        radio = 'radio_button_unchecked';
        newTodo.classList.add('todo', 'd-flex');
    }
    newTodo.innerHTML = `
            <div class="left d-flex">
                <span class="material-icons-outlined btn complete">
                    ${radio}
                </span>

                <div class="task"> ${value}</div>
            </div>

            <span class="material-icons-outlined btn delete">
                highlight_off
            </span>
        `
    todoList.prepend(newTodo);
    input.value = '';
    getAllTodos();
    

    const completeBtn = newTodo.querySelector('.complete');
    const deleteBtn = newTodo.querySelector('.delete');
    
    if(!todo)
        saveTodos(newTodo);
    
    completeBtn.addEventListener('click', completeTodo);
    deleteBtn.addEventListener('click', deleteTodo, false);
    
}

function completeAllTodo(e){
    const todos = getAllTodos();
    todos.forEach(todo => {
        todo.classList.add('completed');
        changeTodoStatus(todo);
    });
}

function showTodos(e){
    const self = e.target;
    showBtns.forEach(show => {
        if(show == self)
            show.classList.add('active');
        else
            show.classList.remove('active');
    });
    const type = self.getAttribute('data-show');
    const todos = getAllTodos();
    
    switch(type){
        case 'all':
            todos.forEach(todo => {
                todo.style.display = 'flex';
            });
            break;
        case 'uncompleted':
            todos.forEach(todo => {
                if(todo.classList.contains('completed'))
                    todo.style.display = 'none';
                else
                    todo.style.display = 'flex';
            });
            break;
        case 'completed':
            todos.forEach(todo => {
                if (!todo.classList.contains('completed'))
                    todo.style.display = 'none';
                else
                    todo.style.display = 'flex';
            });
            break;
    }
}

function completeTodo(e){
    const self = e.target;
    const todo = self.parentElement.parentElement;

    if (self.innerText == 'radio_button_unchecked')
        self.innerText = 'radio_button_checked';
    else
        self.innerText = 'radio_button_unchecked';

    todo.classList.toggle('completed');
    changeTodoStatus(todo);
}

function deleteTodo(e){
    const todo = e.target.parentElement;
    deleteTodoFromLocal(todo);

    todo.remove();
    getAllTodos();
}
function deleteCompletedTodos(e){
    const todos = getAllTodos();
    todos.forEach(todo => {
        if (todo.classList.contains('completed')){
            deleteTodoFromLocal(todo);
            todo.remove();
        }   
    });
    getAllTodos();
}
function getAllTodos(){
    const todos = document.querySelectorAll('.todo');
    totalTodos.innerHTML = todos.length;
    return todos;
}


function checkTodos(){
    let todos = localStorage.getItem('todos');
    if(!todos)
        todos = [];
    else
        todos = JSON.parse(todos);
    
    return todos;
}
function checkTodoStatus() {
    let completed = localStorage.getItem('completed');
    if (!completed)
        completed = [];
    else
        completed = JSON.parse(completed);

    return completed;
}

function saveTodos(todo){
    const task = todo.querySelector('.task').innerText;
    const todos = checkTodos();

    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
    saveTodoStatus(todo);
}

function saveTodoStatus(todo) {
    const completed = todo.classList.contains('completed');
    const status = checkTodoStatus();

    status.push(completed);
    localStorage.setItem('completed', JSON.stringify(status));

}

function changeTodoStatus(todo){
    const todos = checkTodos();
    const status = checkTodoStatus();
    const task = todo.querySelector('.task').innerText;

    const index = todos.indexOf(task);
    status[index] = todo.classList.contains('completed');
    localStorage.setItem('completed', JSON.stringify(status));
}

function fetchTodos(){
    const todos = checkTodos();
    const status = checkTodoStatus();

    for(let i=0; i<todos.length; i++){
        addTodo(undefined, todos[i], status[i]);
    }
}
function deleteTodoFromLocal(todo){
    const task = todo.querySelector('.task').innerText;
    const todos = checkTodos();
    const index = todos.indexOf(task);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    deleteTodoStatus(index);
}

function deleteTodoStatus(index) {
    const status = checkTodoStatus();
    status.splice(index, 1);
    localStorage.setItem('completed', JSON.stringify(status));
}