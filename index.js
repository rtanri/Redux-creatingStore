//1. This is library code.
function createStore(reducer){
    // the store should have 4 parts:
    // 1. the state
    // 2. Get the State - return the state - getState
    // 3. Listen to change on the state - subscribe
    // 4. Update the state
    
        let state  //undefined state
        let listeners =[]
    
        // Create a way to get access to (1) stage
        const getState = () => state
    
        const subscribe =(listener) => {
            listeners.push(listener)
            return () => {
                listeners = listener.filter((l) => l !== listener)
            }
        }
    
        //Dispatch can pass 'state' and 'action' to the PureFunction(todo).
        const dispatch = (action) => {
            state = reducer(state, action) //call the PURE Function
            listeners.forEach((listener) => listener())
        }
    
        // Whenever the invoke createStore(), they get an object back with return.
        return {
            getState,
            subscribe,
            dispatch, //when you put 'dispatch' here, when you call createStore() - it will auto call dispatch
        }
    }
    


//2. This is App Code


const ADD_TODO = 'ADD_TODO' //to remove ERROR of typing of string every single time
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'


//first this function invoked, 'state' is undefined, that's why we put 'state=[]'
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

//3. GOALS function - new Reducer function
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


//Root Reducer, when app first called with undefined state, we make it as an empty object
function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action), //call in reducer and state of action
    } //we return app() an object, instead of array
}


const store = createStore(app) //pass-in Root Reducer


store.subscribe(() => {
    console.log('The new state is: ', store.getState())
})


store.dispatch(
    {
    type: ADD_TODO,
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
     }}
) 

store.dispatch(
    {
    type: ADD_TODO,
    todo: {
        id: 1,
        name: 'Read books',
        complete: false
     }}
) 

store.dispatch(
    {
    type: ADD_TODO,
    todo: {
        id: 2,
        name: 'Walk the dog',
        complete: false
     }}
) 

store.dispatch(
    {
    type:REMOVE_TODO,
    id: 1 }
) 

store.dispatch(
    {
    type:TOGGLE_TODO,
    id: 0
    }
) 

store.dispatch(
    {
    type:ADD_GOAL,
    goal: {
        id: 0,
        name: 'Learn Redux'
     }}
) 

store.dispatch(
    {
    type:ADD_GOAL,
    goal: {
        id: 1,
        name: 'Lose 20 pounds'
     }}
) 

store.dispatch(
    {
    type:REMOVE_GOAL,
    id: 0
    }
) 


