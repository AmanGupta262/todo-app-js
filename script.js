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



// Functions
function addTodo(e){
    e.preventDefault();
    const value = input.value;
    if(!value)
        return;
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

    
}




function getAllTodos(){
    const todos = document.querySelectorAll('.todo');
    totalTodos.innerHTML = todos.length;
}