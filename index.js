// Delete the JAVASCRIPT CODE

function generateId (){ //to generate unique id
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}
             

//2. This is App Code

const ADD_TODO = 'ADD_TODO' //to remove ERROR of typing of string every single time
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo,
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id,
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id,
    }
}

function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal,
    }
}

function removeGoalAction(id){
    return {
        type: REMOVE_GOAL,
        id,
    }
}


function todos (state=[], action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo) => todo.id != action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id != action.id ? todo : 
                Object.assign({}, todo, {complete: !todo.complete}))
        default:
            return state
    }
}


function goals (state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter((goal) => goal.id != action.id)
        default :
            return state
    }
}


//Write this alert here to pop-up before redux.combineReducers
//with Middleware and arrowFunction

const checker = (store) => (next) => (action) => {
    if ( 
        action.type === ADD_TODO &&
        action.todo.name.toLowerCase().includes('bitcoin')
    ){
        return alert("Nope. that's a bad idea.")
    }

    if (
        action.type === ADD_GOAL &&
        action.goal.name.toLowerCase().includes('bitcoin')
    ){
        return alert("Nope. that's a bad idea.")
    }

    // if (action.type === ADD_GOAL){
    //     alert("That's a great goal!")
    // }

    // if (action.type === ADD_TODO) {
    //     alert(`Don't forget to ${action.todo.name} !`)
    // }

    return next(action)
}

//Logger middleware
const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action: ', action)
        const result = next(action)
        console.log('The new state: ', store.getState())
    console.groupEnd()
    return result
}

//Delete root-reducer, change to Redux.combineReducers
const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
}), Redux.applyMiddleware(checker, logger))
//create applyMiddleware as a 2nd Argument in the store state.


// store.subscribe(() => {
//     const { goals, todos } = store.getState()

//     document.getElementById('goals').innerHTML= ''
//     document.getElementById('todos').innerHTML = ''

//     goals.forEach(addGoalToDOM)
//     todos.forEach(addTodoToDOM)
// })



// //3. DOM Code

// function addTodo () {
//     //Grab the value of input, empty the value of input, and Add-to dispatch
//     const input = document.getElementById('todo')
//     const name = input.value
//     input.value = ''

//     store.dispatch(addTodoAction({
//         name,
//         complete:false,
//         id: generateId()
//         //these all props are under name 'todo'
//     }))
// }


// function addGoal (){
//     //Grab the value of input, empty the value of input, and Add to dispatch
//     const input = document.getElementById('goal')
//     const name = input.value
//     input.value = ''

//     store.dispatch(addGoalAction({
//         id: generateId(),
//         name,
//     }))
// }


// //Attach addGoal() and addTodo() to buttons
// document.getElementById('todoBtn').addEventListener('click', addTodo)
// document.getElementById('goalBtn').addEventListener('click', addGoal)


//         //Function to create REMOVE Button -- read throu this
//         function createRemoveButton(onClick){
//             const removeBtn = document.createElement ('button')
//             removeBtn.innerHTML = 'x'
//             removeBtn.style.marginLeft = '30px'
//             removeBtn.addEventListener('click', onClick)
//             return removeBtn
//         }



// function addTodoToDOM(todo) {
//     const node = document.createElement('li')
//     const text = document.createTextNode(todo.name)

//         const removeBtn = createRemoveButton(() => {
//             store.dispatch(removeTodoAction(todo.id))
//         })


//     node.appendChild(text)
//     node.appendChild(removeBtn)

//     node.style.textDecoration = todo.complete ? 'line-through' : 'none'

//     node.addEventListener('click', () => {
//         store.dispatch(toggleTodoAction(todo.id))
//     })

//     document.getElementById('todos').appendChild(node)
// }


// function addGoalToDOM(goal){
//     const node = document.createElement('li')
//     const text = document.createTextNode(goal.name)

//     const removeBtn = createRemoveButton(() => {
//         store.dispatch(removeGoalAction(goal.id))
//     })

//     node.appendChild(text)
//     node.appendChild(removeBtn)


//     document.getElementById('goals').appendChild(node)
// }
