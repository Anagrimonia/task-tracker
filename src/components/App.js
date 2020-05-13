import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'

import classnames from 'classnames';
import styles from "./App.scss";

import thunk from 'redux-thunk';
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from 'redux';

import rootReducer from "../reducers";
import { changeTheme } from "../actions";

import ThemeBar from "./ThemeBar";
import TaskWrapper from "./TaskWrapper";
import ProjectWrapper from "./ProjectWrapper";
import Authorization from "./Authorization";

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);
const store = createStore(rootReducer, applyMiddleware(thunk));

const mapStateToProps = state => ({
  theme: state.theme,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(changeTheme(theme))
});


const ProjectsPage = (theme) => {
  return <ProjectWrapper theme={theme} />
};

const TasksPage = (project_id, theme) => {
  return (
    <div>
      <Link to='/projects'>
        <p className={cx("info")}>
          Go back
        </p>
      </Link>
      <TaskWrapper id={project_id} theme={theme} />
    </div>
  );
};

const NotFoundPage = () => {
  return (
    <div>
      <p className={cx("info")}>
        404: Page Not Found
      </p>
      <Link to='/projects'>
        <p className={cx("info")}>
          Go back
        </p>
      </Link>
    </div>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.user ? <Component {...props} /> : <Redirect to='/login' />
  )} />
)

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.user ? <Redirect to='/projects' /> : <Component {...props} />
  )} />
)

class App extends React.Component {

  onThemeChange = () => {
    this.props.changeTheme(this.props.theme === 'dark' ? 'light' : 'dark');
  };

  render() {
    return (
      <BrowserRouter>
        <div className={cx('container', { [`container__theme-${this.props.theme}`]: true })}>
          <ThemeBar onThemeChange={this.onThemeChange} />
          <Switch>
            <Route exact path='/' component={() => <Redirect to='/projects'/>} />
            <AuthRoute exact path='/login' component={Authorization} user={this.props.user} />
            <PrivateRoute exact path='/projects' component={ProjectsPage} user={this.props.user} />
            <PrivateRoute exact path='/projects/:id(\d+)' component={TasksPage} user={this.props.user} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const AppContainer = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

App.propTypes = {
  theme: PropTypes.string,
  user: PropTypes.string
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;