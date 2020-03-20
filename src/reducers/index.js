import { ADD_TASK, SORT_TASKS, CHANGE_THEME } from "../actions";

const defaultState = {
  tasks: [],
  theme: 'light',
};

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    }

    case SORT_TASKS: {
      var param = action.payload;
      const sorted = [].slice.call(state.tasks).sort((a, b) => {
        if (!isNaN(a[param]) || !isNaN(b[param])) { return a[param] - b[param]; }
        if (a[param] === b[param]) { return 0; }
        return a[param] > b[param] ? 0 : -1;
      });

      return {
        ...state,
        tasks: sorted
      };
    }

    case CHANGE_THEME: {
      return {
        ...state,
        theme: action.payload
      }
    }
    default:
      return state;
  }
};

export default rootReducer;