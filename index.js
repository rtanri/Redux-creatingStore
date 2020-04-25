//1. This is library code.
function createStore(reducer){
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
//REDUCER: PURE FUNCTION that import state & action, then reducing that to a brand new state.
//first this function invoked, 'state' is undefined, that's why we put 'state=[]'
function todos (state=[], action) {
    if(action.type === 'ADD_TODO'){
        return state.concat([action.todo])
    }


    return state //brand new state created by REDUCER
}



//ACTION Creator - record as a function that create/return action object
const action = todo =>(
    {
        type: "ADD_TODO",  //type - let REDUX know exactly what event took place
        todo: {
            id: 0,
            name: 'Learn Redux',
            complete: false
        }
    },

    {
        type:"REMOVE_TODO",
        id:0
    },

    {
        type: "TOGGLE_TODO",
        id: 0
    },

    {
        type: "ADD_GOAL",
        goal: {
            id: 0,
            name: "Run a Marathon",
        }
    },

    {
        type: "REMOVE_GOAL",
        id:0
    } 
);