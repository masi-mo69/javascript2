let $ = document
const inputElem = $.getElementById('itemInput')
const addButton = $.getElementById('addButton')
const clearButton = $.getElementById('clearButton')
const todoListElem = $.getElementById('todoList')


let todosArray = []


function addNewTodo (){
    let newTodoTitle = inputElem.value


    let newTodosObj = {
        id: todosArray.length + 1,
        title: newTodoTitle,
        complete: false
    }


    inputElem.value = ''


    todosArray.push(newTodosObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)


    inputElem.focus()
}



function setLocalStorage(todosList){
    localStorage.setItem('todos' , JSON.stringify(todosList))
}


function todosGenerator(todoslist) {
    let newTodoLiElem, newTodoLableElem, newTodoCompleteBtn, newTodoDeleteBtn


    todoListElem.innerHTML = ''


    todoslist.forEach(function (todo) {
        newTodoLiElem = $.createElement('li')
        newTodoLiElem.className = todo.complete ? 'completed well' : 'uncompleted well'


        newTodoLableElem = $.createElement('label')
        newTodoLableElem.textContent = todo.title


        newTodoCompleteBtn = $.createElement('button')
        newTodoCompleteBtn.className = 'btn btn-success'
        newTodoCompleteBtn.textContent = todo.complete ? 'Uncomplete' : 'Complete'
        newTodoCompleteBtn.addEventListener('click', () => editTodo(todo.id))


        newTodoDeleteBtn = $.createElement('button')
        newTodoDeleteBtn.className = 'btn btn-danger'
        newTodoDeleteBtn.textContent = 'Delete'
        newTodoDeleteBtn.addEventListener('click', () => removeTodo(todo.id))


        newTodoLiElem.append(newTodoLableElem, ' ', newTodoCompleteBtn, ' ', newTodoDeleteBtn) // Add spaces between elements


        todoListElem.append(newTodoLiElem)
    })
}



function editTodo(todoId) {
    todosArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })
    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}


function removeTodo(todoId) {
 
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos


    let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId
    })


    todosArray.splice(mainTodoIndex , 1)


    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}



function getLocalStorage() {
   let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    
   if(localStorageTodos){
        todosArray = localStorageTodos
   }
   else{
    todosArray = []
   }


   todosGenerator(todosArray)
}


function clearTodos() {
    todosArray = []
    todosGenerator(todosArray)
    // localStorage.clear()
    localStorage.removeItem('todos')
}


window.addEventListener('load' , getLocalStorage)
addButton.addEventListener('click' , addNewTodo)
clearButton.addEventListener('click' , clearTodos)
inputElem.addEventListener('keydown' , function(event){
    if (event.code === 'Enter') {
        addNewTodo()
    }
})