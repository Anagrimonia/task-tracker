import React from 'react';
import classnames from 'classnames';
import styles from "./App.scss";

import { connect } from "react-redux";
import { registerUser, loginUser } from "../actions";

import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
  loginUser: user => dispatch(loginUser(user))
})

class Authorization extends React.Component {
  state = {
    login: '',
    password: '',
    passwordConfirm: '',
    isNew: false,
    isValid: false
  };

  checkValid = () => {
    if (this.state.login && this.state.password && 
      (!this.state.isNew || this.state.password === this.state.passwordConfirm))
        this.setState({ isValid: true });
      else 
        this.setState({ isValid: false });
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value }, () => {
      this.checkValid();
    });
  };

  handleAuthMode = () => {
    this.setState({ isNew: !this.state.isNew }, () => {
      this.checkValid();
    });
  };

  handleSubmit = event => {
    event.preventDefault()
    const user = { login: this.state.login, password: this.state.password }

    if (this.state.isNew) 
      this.props.registerUser(user);
    else 
      this.props.loginUser(user);
  };

  render() {
    return (
      <form className={cx('auth-form')} onSubmit={this.handleSubmit}>
        { this.state.isNew ? <h1><p>Sign up</p></h1> : <h1><p>Sign in</p></h1> }
        <br/>
        <input
          name='login'
          placeholder='Login'
          value={this.state.login}
          onChange={this.handleChange}
          /><br/>

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
        /><br/>

        {
          this.state.isNew ?

          <div style={{display: 'inherit'}}>
            <input
              type='password'
              name='passwordConfirm'
              placeholder='Confirm Password'
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
            /><br/>
            <p onClick={this.handleAuthMode}>Already have an account?</p>
          </div>

          :

          <p onClick={this.handleAuthMode}>Don't have an account?</p>
        }

        <br/>
        <input disabled={!this.state.isValid} type='submit'/>
      </form>
    )
  }
}

Authorization.propTypes = { };

export default connect(null, mapDispatchToProps)(Authorization);