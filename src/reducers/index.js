import { ADD_PROJECT, ADD_TASK, SORT_TASKS, CHANGE_THEME } from "../actions";

const defaultState = {
  projects: [],
  tasks: {},
  theme: 'light',
};
        

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {

    case ADD_PROJECT: {
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };
    }

    case ADD_TASK: {
      var project_tasks = action.payload.project_id in state.tasks ? [...state.tasks[action.payload.project_id]] : []
      project_tasks.push(action.payload.task);

      return {
        ...state,
        tasks: {...state.tasks, [action.payload.project_id]: project_tasks }
      };
    }

    case SORT_TASKS: {

      var param = action.payload;
      var sorted = {};

      for (const [key, value] of Object.entries(state.tasks)) {
        sorted[key] = [].slice.call(value).sort((a, b) => {
        if (!isNaN(a[param]) || !isNaN(b[param])) return a[param] - b[param];
        if (a[param] === b[param]) return 0;
        return a[param] > b[param] ? 0 : -1;
        });
      }

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