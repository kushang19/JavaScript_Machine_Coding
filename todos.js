let state = {
    inputVal: "",
    todos: ["React", "JavaScript", "HTML", "CSS"],
    editIndex: null,
}
 
function setState(newState){
    state = {...state, ...newState}
    renderList();
}

function render(){
    const root = document.getElementById("root")
    root.innerHTML = `
    <div>
        <input
            type="text"
            id="todo-input"
            placeholder="Enter"
        />
        <button id="add-btn">Add</button>
        <ul id="todo-list"></ul>
    </div>
    `
}

function renderList(){
    const todoList = document.getElementById("todo-list")
    todoList.innerHTML = state.todos.map((todo, index) => `
            <li>
                <span>${index + 1}.</span>
                <span>${todo}</span>
                <p></p>
                <div>
                    <button data-index="${index}" class="edit-btn">edit</button>
                    <button data-index="${index}" class="del-btn">delete</button>
                </div>
            </li>
   
    `).join("")
}

document.addEventListener("input", function(e){
    if(e.target.id === "todo-input"){
        state.inputVal = e.target.value
    }
})

document.addEventListener("click", function(e){

    if(e.target.id === "add-btn"){
        handleAddOrUpdate();
    }
    if(e.target.classList.contains("edit-btn")){
        const index = Number(e.target.dataset.index)
        handleEdit(index);
    }
    if(e.target.classList.contains("del-btn")){
        const index = Number(e.target.dataset.index)
        handleDelete(index);
    }
   
})

function handleAddOrUpdate(){

    let inputElement = document.getElementById("todo-input")
    if(!inputElement.value.trim()) return
    if(state.editIndex !== null){
       
        const updateTodod = [...state.todos]
        updateTodod[state.editIndex] = inputElement.value
       
        setState({
            todos: updateTodod,
            editIndex: null,
        })
       
    }else{
        setState({
            todos: [...state.todos, inputElement.value]
        })
    }
   
    inputElement.value = ""
    state.inputVal = ""
}

function handleEdit(index){
    let inputElement = document.getElementById("todo-input")
    inputElement.value = state.todos[index]
    // state.inputVal = state.todos[index]
   
    setState({
        editIndex: index,
    })
   
}

function handleDelete(index){
    const newTodo = state.todos.filter((_, i) => i !== index);
   
    setState({
        todos: newTodo,
    })
}


//  init
render();
renderList();
