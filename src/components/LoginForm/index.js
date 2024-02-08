import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onSuccessLogin = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          placeholder="Username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          id="password"
          type="password"
          className="input-field"
          placeholder="Password"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="login-page-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
