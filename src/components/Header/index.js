import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    history.replace('/login')

    Cookies.remove('jwt_token')
  }

  return (
    <nav className="nav-header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-website-logo"
        />
      </Link>
      <ul className="nav-menu">
        <Link to="/" className="nav-item">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="nav-item">
          <li>Jobs</li>
        </Link>
        <li className="home-logout-button-container">
          <button
            type="button"
            className="home-logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
