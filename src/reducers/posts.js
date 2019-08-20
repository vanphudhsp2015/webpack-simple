const INITIAL_STATE = {
  all: []
};

export default function(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case "LOAD_POST_SUCCESS":
      return {
        ...state
      };
    case "LOAD_GET":
      return {
        ...state,
        all: action.payload
      };
    case "REMOVE_POSTS":
      return {
        ...state,
        all: state.all.filter(item => item.id !== action.payload)
      };
    case "ADD_POST_SUCCESS":
      return {
        ...state,
        all: [...state.all, action.payload]
      };
    default:
      return {
        ...state
      };
  }
}
