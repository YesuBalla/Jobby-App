import {Component} from 'react'

import Header from '../Header'

import ProfileSection from '../ProfileSection'

import './index.css'

class Jobs extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="jobs-body">
          <div className="side-bar">
            <ProfileSection />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
