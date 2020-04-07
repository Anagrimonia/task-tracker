import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'

import classnames from 'classnames';
import styles from "./App.scss";

import { Provider } from "react-redux";
import { connect } from "react-redux";
import { createStore } from "redux";

import rootReducer from "../reducers";
import { changeTheme } from "../actions";

import ThemeBar from "./ThemeBar";
import TaskWrapper from "./TaskWrapper";
import ProjectWrapper from "./ProjectWrapper";

const cx = classnames.bind(styles);
const store = createStore(rootReducer);

const mapStateToProps = state => ({
  theme: state.theme,
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(changeTheme(theme))
});

class App extends React.Component {

  onThemeChange = () => {
    this.props.changeTheme(this.props.theme === 'dark' ? 'light' : 'dark');
  };

  render() {
    return (
      <BrowserRouter>
        <div className={cx('container', { [`container__theme-${this.props.theme}`]: true })}>
          <ThemeBar theme={this.props.theme} onThemeChange={this.onThemeChange} />
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/projects' />} />
            <Route exact path='/projects'>
              <ProjectWrapper theme={this.props.theme} />
            </Route>
            <Route exact path='/projects/:id(\d+)' 
                   render={(props) => {
                    if (props.match.params.id >= 0 
                      && props.match.params.id < this.props.projects.length)
                      return (<div>
                                <Link to='/projects'><p className={cx("info")}>Go back</p></Link>
                                <TaskWrapper id={props.match.params.id} theme={this.props.theme} />
                              </div>)
                    else return <Redirect to='/projects' />;
            }}/>
            <Route>
              <p className={cx("info")}>404: Page Not Found</p>
              <Link to='/projects'><p className={cx("info")}>Go back</p></Link>
            </Route>
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

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;