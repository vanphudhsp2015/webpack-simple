import { IMAGES } from "../contants";
const INITIAL_STATE = {
  all: []
};

export default function(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case IMAGES.LOAD_SUCCESS:
      return {
        ...state,
        all: action.payload
      };
    case IMAGES.LOAD:
      return {
        ...state,
        all: [
          {
            id: 1
          }
        ]
      };
    default:
      return {
        ...state
      };
  }
}
