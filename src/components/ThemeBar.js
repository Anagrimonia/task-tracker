import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

const ThemeBar = ({theme, onThemeChange}) => {
  return (
    <div className={cx("theme-bar", { [`theme-bar__theme-${theme}`]: true })} >
      <button className={cx("theme-bar__button button", { [`button__theme-${theme}`]: true })}
              onClick={onThemeChange}>
              Switch theme
      </button>
    </div>
  );
};

ThemeBar.propTypes = {
  theme: PropTypes.string,
  onThemeChange: PropTypes.func,
};

export default ThemeBar; 