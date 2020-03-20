import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import { Provider } from "react-redux";
import { connect } from "react-redux";
import { createStore } from "redux";

import rootReducer from "../reducers";
import { changeTheme } from "../actions";

import ThemeBar from "./ThemeBar";
import TaskWrapper from "./TaskWrapper";

const cx = classnames.bind(styles);
const store = createStore(rootReducer);

const mapStateToProps = state => ({
  theme: state.theme,
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
      <div className={cx('container', { [`container__theme-${this.props.theme}`]: true })}>
        <ThemeBar theme={this.props.theme} onThemeChange={this.onThemeChange} />
        <TaskWrapper theme={this.props.theme}/>
      </div>
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