import React from 'react';
import classnames from 'classnames';
import styles from "../App.scss";

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

export default ThemeBar; 