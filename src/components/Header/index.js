import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav className="nav-header">
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      alt="website logo"
      className="nav-website-logo"
    />
    <ul className="nav-menu">
      <Link to="/" className="nav-item">
        <li>Home</li>
      </Link>
      <Link to="/Jobs" className="nav-item">
        <li>Jobs</li>
      </Link>
    </ul>
    <button type="button" className="home-logout-button">
      Logout
    </button>
  </nav>
)

export default Header
