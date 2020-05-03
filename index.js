function generateId () {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  }

  // App Code
  const ADD_TODO = 'ADD_TODO'
  const REMOVE_TODO = 'REMOVE_TODO'
  const TOGGLE_TODO = 'TOGGLE_TODO'
  const ADD_GOAL = 'ADD_GOAL'
  const REMOVE_GOAL = 'REMOVE_GOAL'
  const RECEIVE_DATA = 'RECEIVE_DATA'

  function addTodoAction (todo) {
    return {
      type: ADD_TODO,
      todo,
    }
  }

  function removeTodoAction (id) {
    return {
      type: REMOVE_TODO,
      id,
    }
  }

  function toggleTodoAction (id) {
    return {
      type: TOGGLE_TODO,
      id,
    }
  }

  function addGoalAction (goal) {
    return {
      type: ADD_GOAL,
      goal,
    }
  }

  function removeGoalAction (id) {
    return {
      type: REMOVE_GOAL,
      id,
    }
  }

  //new action creator
  function receiveDataAction(todos, goals){
    return {
      type: RECEIVE_DATA,
      todos,
      goals,
    }
  }

  function handleAddTodo (name, cb){
    return (dispatch) => {
        return API.saveTodo(name)
        .then((todo) => {
          dispatch(addTodoAction(todo))
          cb()
        })
        .catch(()=> {
          alert('Error in adding todo list, try again')
          // this.input.value = '' 
        })
    }
  }

  function handleDeleteTodo (todo) {
    return (dispatch) => {
      dispatch(removeTodoAction(todo.id)) 

      return API.deleteTodo(todo.id) 
        .catch(() => {
          dispatch(addTodoAction(todo))
          alert('An error occurred, try delete again')
        })
    }
  }

  function handleAddGoal(name, cb){
    return (dispatch) => {
      return API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoalAction(goal))
        cb() //callback function that is passed as 2nd argument
      })
      .catch(() => { alert('Error in adding goal, try again')})
    }
  }

  function handleDeleteGoal(goal){
    return(dispatch) => {
      dispatch(removeGoalAction(goal.id))

        return API.deleteGoal (goal.id)
          .catch(()=> {
            dispatch(addGoalAction(goal))
            alert('An error is occurred, try again')
          })
    }
  }

  function todos (state = [], action) {
    switch(action.type) {
      case ADD_TODO :
        return state.concat([action.todo])
      case REMOVE_TODO :
        return state.filter((todo) => todo.id !== action.id)
      case TOGGLE_TODO :
        return state.map((todo) => todo.id !== action.id ? todo :
          Object.assign({}, todo, { complete: !todo.complete }))
      case RECEIVE_DATA :
        return action.todos
      default :
        return state
    }
  }

  function goals (state = [], action) {
    switch(action.type) {
      case ADD_GOAL :
        return state.concat([action.goal])
      case REMOVE_GOAL :
        return state.filter((goal) => goal.id !== action.id)
      case RECEIVE_DATA :
        return action.goals
      default :
        return state
    }
  }

  function loading (state = true, action){
    switch (action.type){
      case RECEIVE_DATA :
        return false
      default :
        return state 
    }
  }

  const checker = (store) => (next) => (action) => {
    if (
      action.type === ADD_TODO &&
      action.todo.name.toLowerCase().includes('bitcoin')
    ) {
      return alert("Nope. That's a bad idea.")
    }

    if (
      action.type === ADD_GOAL &&
      action.goal.name.toLowerCase().includes('bitcoin')
    ) {
      return alert("Nope. That's a bad idea.")
    }

    return next(action)
  }

  const logger = (store) => (next) => (action) => {
    console.group(action.type)
      console.log('The action: ', action)
      const result = next(action)
      console.log('The new state: ', store.getState())
    console.groupEnd()
    return result
  }

  // Thunk middleware
  const thunk = (store) => (next) => (action) => {
    if (typeof action === 'function' ){
      return action(store.dispatch) 
    } //if the action is a function, then we pass the 'store.dispatch', if not, just continue to next(action)
    return next(action)
  }

  const store = Redux.createStore(Redux.combineReducers({
    todos,
    goals,
    loading,
  }), Redux.applyMiddleware(ReduxThunk.default, checker, logger))
