export const ADD_TASK = "ADD_TASK";
export const addTask = (task, project_id) => ({
  type: ADD_TASK,
  payload: { task: task, project_id: project_id }
});

export const ADD_PROJECT = "ADD_PROJECT";
export const addProject = project => ({
  type: ADD_PROJECT,
  payload: project
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