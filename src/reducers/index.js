import { combineReducers } from 'redux';
import {
  REGISTER_USER,
  LOGIN_USER,
  INIT_PROJECTS, 
  INIT_TASKS, 
  ADD_PROJECT, 
  ADD_TASK, 
  EDIT_TASK,
  SORT_TASKS, 
  CHANGE_THEME 
} from "../actions";

const userReducer = (state = '', action) => {
  switch (action.type) {
    case REGISTER_USER:
      return (action.payload) ? action.payload : state;

    case LOGIN_USER:
      console.log(action.payload);
      return (action.payload) ? action.payload : state;

    default:
      return state;
  }
};

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_TASKS:
      return (action.payload) ? action.payload : state;

    case ADD_TASK:
      return (action.payload) ? [...state, action.payload] : state;
      
    case EDIT_TASK:
      return state.map((task) =>
        (action.payload.id === task.id) ? action.payload : task
      );

    case SORT_TASKS:
      return [...state].sort((a, b) => {
        switch (action.payload) {
          case 'name':
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
          case 'description':
            const descA = a.description.toLowerCase();
            const descB = b.description.toLowerCase();
            return descA < descB ? -1 : descA > descB ? 1 : 0;
          case 'priority':
            return a.priority - b.priority;
          case 'completed':
            return (a.completed === b.completed) ? 0 : a.completed ? -1 : 1;
          default:
            return true;
        }
      });

    default:
      return state;
  }
};

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_PROJECTS:
      return action.payload ? action.payload : [];

    case ADD_PROJECT:
      return [...state, action.payload];

    default:
      return state;
  }
};

const themeReducer = (state = 'light', action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.payload;

    default:
      return state;
  }
};


const rootReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  theme: themeReducer,
});

export default rootReducer;