import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: '',
    skills: [],
    lifeAtCompany: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jobDetails = data.job_details
      const skillsList = jobDetails.skills
      const lifeAtCompany = jobDetails.life_at_company
      const formatedLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }
      const formatedSkillsList = skillsList.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const formatedJobDetails = {
        id: jobDetails.id,
        title: jobDetails.title,
        rating: jobDetails.rating,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
      }

      const similarJobsList = data.similar_jobs
      const formatedSimilarJobsList = similarJobsList.map(eachSimilarJob => ({
        id: eachSimilarJob.id,
        title: eachSimilarJob.title,
        jobDescription: eachSimilarJob.job_description,
        employmentType: eachSimilarJob.employment_type,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        companyLogoUrl: eachSimilarJob.company_logo_url,
      }))
      this.setState({
        jobDetails: formatedJobDetails,
        skills: formatedSkillsList,
        lifeAtCompany: formatedLifeAtCompany,
        similarJobsList: formatedSimilarJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobsList} = this.state
    const {
      title,
      rating,
      location,
      packagePerAnnum,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job-details-body">
        <div className="job-card-container-2">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <IoIosStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container-2">
            <div className="location-employment-container-2">
              <div className="details-item-2">
                <MdLocationOn className="icon" />
                <p className="details-2">{location}</p>
              </div>
              <div className="details-item-2">
                <BsFillBriefcaseFill className="icon" />
                <p className="details-2">{employmentType}</p>
              </div>
            </div>
            <p className="package-2">{packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <div className="description-container">
            <div className="description-heading-container">
              <h1 className="description-heading-2">Description</h1>
              <a href={companyWebsiteUrl} target="blank" className="visit-link">
                Visit <FaExternalLinkAlt className="link-icon" />
              </a>
            </div>
            <p className="description-2">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachSkill => (
                <li className="skill" key={eachSkill.name}>
                  <img
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                    className="skill-logo"
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-description-container">
              <p className="life-at-company-description">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobsList.map(eachJob => (
              <SimilarJobCard key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderJobDetailsLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => {
    this.getJobDetailsData()
  }

  renderJobDetailsFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobDetailsLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDetailsView()}
      </>
    )
  }
}

export default JobDetails
