function createStore(){
// the store should have 4 parts:
// 1. the state
// 2. Get the State - return the state - getState
// 3. Listen to change on the state - subscribe
// 4. Update the state

    let state 
    let listeners =[]

    // Create a way to get access to (1) stage
    const getState = () => state

    const subscribe =(listener) => {
        listeners.push(listener)
        return () => {
            listeners = listener.filter((l) => l !== listener)
        }
    }

    // Whenever the invoke createStore(), they get an object back with return.
    return {
        getState,
        subscribe
    }
}

//ACTION Creator - record as a function that create/return action object
const todo = todo =>(
{
    type: "ADD_TODO"  //type - let REDUX know exactly what event took place
    todo: {
        id: 0,
        name: 'Learn Redux',
        complete: false
    }
});

{
    type:"REMOVE_TODO"
    id:0
}

{
    type: "TOGGLE_TODO"
    id: 0
}

{
    type: "ADD_GOAL"
    goal: {
        id: 0,
        name: "Run a Marathon",
    }
}

{
    type: "REMOVE_GOAL"
    id:0
}