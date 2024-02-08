import {Link} from 'react-router-dom'

import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    jobDescription,
    employmentType,
    companyLogoUrl,
    location,
    packagePerAnnum,
    rating,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <div className="job-card-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <div className="job-details-container">
          <div className="location-employment-container">
            <div className="details-item">
              <MdLocationOn />
              <p className="details">{location}</p>
            </div>
            <div className="details-item">
              <BsFillBriefcaseFill />
              <p className="details">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
