const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  test: {
    value: 123,
    text: 'change',
  },
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      const good = state.good + 1;
      return { ...state, good };
    case 'OK':
      const ok = state.ok + 1;
      return { ...state, ok };
    case 'BAD':
      const bad = state.bad + 1;

      return { ...state, bad };
    case 'ZERO':
      return initialState;
    case 'TEST':
      return state;
    default:
      return state;
  }
};

export default counterReducer;
