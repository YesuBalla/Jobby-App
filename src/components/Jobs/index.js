import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import ProfileSection from '../ProfileSection'
import EmploymentFilters from '../EmploymentFilters'
import SalaryFilters from '../SalaryFilters'
import JobCard from '../JobCard'

import './index.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    minimumPackage: '',
    searchInput: '',
    onSubmitSearchInput: '',
    employmentList: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentList, minimumPackage, onSubmitSearchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentList.join()}&minimum_package=${minimumPackage}&search=${onSubmitSearchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)
    const data = await response.json()
    if (response.ok) {
      const formatedData = data.jobs.map(job => ({
        title: job.title,
        id: job.id,
        jobDescription: job.job_description,
        employmentType: job.employment_type,
        companyLogoUrl: job.company_logo_url,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
      }))
      this.setState({
        jobsList: formatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    const isEmptyList = jobsList.length === 0
    return (
      <>
        {!isEmptyList && (
          <ul className="search-results">
            {jobsList.map(eachJob => (
              <JobCard jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        )}
        {isEmptyList && (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-image"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-description">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => this.getJobsData()

  renderFailureView = () => (
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

  renderSearchResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  onChangeEmploymentFilters = event => {
    const {employmentList} = this.state
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentList: [...prevState.employmentList, event.target.value],
        }),
        this.getJobsData,
      )
    } else {
      const newEmploymentList = employmentList.filter(
        item => item !== event.target.value,
      )
      this.setState({employmentList: newEmploymentList}, this.getJobsData)
    }
  }

  onChangeSalaryRange = salaryRange => {
    this.setState({minimumPackage: salaryRange}, this.getJobsData)
  }

  onSearchJobs = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterKey = event => {
    const {searchInput} = this.state
    if (event.key === 'Enter') {
      this.setState({onSubmitSearchInput: searchInput}, this.getJobsData)
    }
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState({onSubmitSearchInput: searchInput}, this.getJobsData)
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-body">
          <div className="side-bar">
            <ProfileSection />
            <hr className="separator" />
            <div className="filter-container">
              <h1 className="filters-heading">Type of Employment</h1>
              <ul className="filters">
                {employmentTypesList.map(employment => (
                  <EmploymentFilters
                    typeOfEmployment={employment}
                    key={employment.employmentTypeId}
                    onChangeEmployment={this.onChangeEmploymentFilters}
                  />
                ))}
              </ul>
            </div>
            <hr className="separator" />
            <div className="filter-container">
              <h1 className="filters-heading">Salary Range</h1>
              <ul className="filters">
                {salaryRangesList.map(range => (
                  <SalaryFilters
                    salaryRange={range}
                    key={range.salaryRangeId}
                    onChangeSalary={this.onChangeSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="content-container">
            <div className="search-bar">
              <input
                type="search"
                className="input-search"
                id="search"
                placeholder="Search"
                onChange={this.onSearchJobs}
                onKeyDown={this.onEnterKey}
                value={searchInput}
              />
              <button
                data-testid="searchButton"
                type="button"
                aria-label="searchButton"
                className="search-button"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch />
              </button>
            </div>
            {this.renderSearchResults()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
