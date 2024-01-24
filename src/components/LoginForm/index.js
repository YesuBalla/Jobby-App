import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  renderUsernameField = () => (
    <>
      <label htmlFor="username" className="label-text">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="input-field"
        placeholder="Username"
      />
    </>
  )

  renderPasswordField = () => (
    <>
      <label htmlFor="password" className="label-text">
        PASSWORD
      </label>
      <input
        id="password"
        type="password"
        className="input-field"
        placeholder="Password"
      />
    </>
  )

  render() {
    return (
      <div className="login-page-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container">
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
