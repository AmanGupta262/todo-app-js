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


// Functions
function addTodo(e){
    e.preventDefault();
    const value = input.value.trim();
    if(!value){
        input.value = '';
        return;
    }
    const newTodo = document.createElement('div');
    
    newTodo.classList.add('todo', 'd-flex');
    newTodo.innerHTML = `
            <div class="left d-flex">
                <span class="material-icons-outlined btn complete">
                    radio_button_unchecked
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
    
    completeBtn.addEventListener('click', completeTodo);

    
}

function completeAllTodo(e){
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        todo.classList.add('completed');
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
    const todos = document.querySelectorAll('.todo');
    
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
}

function getAllTodos(){
    const todos = document.querySelectorAll('.todo');
    totalTodos.innerHTML = todos.length;
}