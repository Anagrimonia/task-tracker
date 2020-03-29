export const ADD_TASK = "ADD_TASK";
export const addTask = task => ({
  type: ADD_TASK,
  payload: task
});

export const SORT_TASKS = "SORT_TASKS";
export const sortTasks = param => ({
  type: SORT_TASKS,
  payload: param
});

export const CHANGE_THEME = "CHANGE_THEME";
export const changeTheme = theme => ({
  type: CHANGE_THEME,
  payload: theme
});