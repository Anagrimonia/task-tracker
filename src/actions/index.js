import { request } from './api';

export const REGISTER_USER = 'REGISTER_USER';
export const registerUser = (user) => (dispatch) => {
  request('/register/', 'POST', user).then((res) => {
  	if (res && res.token) {
  		localStorage.setItem("token", res.token);
    	dispatch({ type: REGISTER_USER, payload: user.login });
  	}
  });
};

export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = (user) => (dispatch) => {
  request('/login/', 'POST', user).then((res) => {
  	if (res && res.token) {
  		localStorage.setItem("token", res.token);
    	dispatch({ type: LOGIN_USER, payload: user.login });
  	}
  });
};

export const INIT_PROJECTS = 'INIT_PROJECTS';
export const initProjects = () => (dispatch) => {
  request('/projects/').then((res) => {
    if (res) dispatch({ type: INIT_PROJECTS, payload: res })
  });
};

export const INIT_TASKS = 'INIT_TASKS';
export const initTasks = (project_id) => (dispatch) => {
  request(`/projects/${project_id}/tasks/`).then((res) => {
    if (res) dispatch({ type: INIT_TASKS, payload: res })
  });
};

export const ADD_PROJECT = 'ADD_PROJECT';
export const addProject = (project) => (dispatch) => {
  request('/projects/', 'POST', project).then((res) => {
  	if (res) dispatch({ type: ADD_PROJECT, payload: res })
  });
};

export const ADD_TASK = 'ADD_TASK';
export const addTask = (task, project_id) => (dispatch) => {
  request(`/projects/${project_id}/tasks/`, 'POST', task).then((res) => {
    if (res) dispatch({ type: ADD_TASK, payload: res })
  });
};

export const EDIT_TASK = 'EDIT_TASK';
export const editTask = (task, project_id) => (dispatch) => {
  request(`/projects/${project_id}/tasks/${task.id}/`, 'PUT', task).then((res) => 
  	dispatch(initTasks(project_id))
  );
};

export const SORT_TASKS = 'SORT_TASKS';
export const sortTasks = param => ({
  type: SORT_TASKS,
  payload: param
});

export const CHANGE_THEME = 'CHANGE_THEME';
export const changeTheme = theme => ({
  type: CHANGE_THEME,
  payload: theme
});