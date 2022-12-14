class State {
  constructor(initialState, callback) {
    this.initialState = { value: initialState };
    this.callback = typeof callback === "function" ? callback : () => {};

    const handler = {
      get: (target, prop) => {
        if(typeof target[prop] === "object"){
          return new Proxy(target[prop], handler)
        }
        return target[prop]
      },
      set: (target, prop, value) => {
        target[prop] = value  // this.state["counter"] = 1
        this.callback({...this.state})
      },
    }

    this.state = new Proxy(this.initialState.value, handler)
  }

  // get state() {
  //   return this.initialState.value;
  // }

  // set state(value){
  //     this.initialState.value = {
  //        ...this.initialState.value,
  //        ...value
  //     }
  //     this.callback(this.initialState.value)
  //     return true
  // }

//   setState = (value) => {
//     this.initialState.value = {
//       ...this.initialState.value,
//       ...value,
//     };

//     this.callback(this.initialState.value)
//   };
 }

const memory = new State({ 
  counter: 0,
  user: {
    id: 0,
    address: {
      cd: {
        lat: 0,
        lon: 0,
      }
    }
  }
}, (newState) => {
  console.log(newState);
});

// memory.setState({counter: memory.state.counter + 1})

memory.state.counter = memory.state.counter + 1;

/*  memory.state = {counter: memory.state.counter + 1}; */
