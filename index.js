class State {
  constructor(initialState, callback) {
    this.initialState = { value: initialState };
    this.callback = typeof callback === "function" ? callback : () => {};
  }

  get state() {
    return this.initialState.value;
  }

  // set state(value){
  //     this.initialState.value = {
  //        ...this.initialState.value,
  //        ...value
  //     }
  //     this.callback(this.initialState.value)
  //     return true
  // }

  setState = (value) => {
    this.initialState.value = {
      ...this.initialState.value,
      ...value,
    };

    this.callback(this.initialState.value)
  };
}

const memory = new State({ counter: 0 }, (newState) => {
  console.log(newState);
});

memory.setState({counter: memory.state.counter + 1})

/* memory.state.counter = memory.state.counter + 1; */

/*  memory.state = {counter: memory.state.counter + 1}; */
