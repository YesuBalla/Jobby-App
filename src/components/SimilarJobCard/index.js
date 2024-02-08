import {IoIosStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    title,
    jobDescription,
    employmentType,
    companyLogoUrl,
    location,
    rating,
  } = jobDetails
  return (
    <li className="similar-job-card-container">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="title-rating-container-3">
          <h1 className="job-title">{title}</h1>
          <div className="rating-container">
            <IoIosStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="description-container">
        <h1 className="description-heading-3">Description</h1>
        <p className="description-3">{jobDescription}</p>
        <div className="location-employment-container-3">
          <div className="details-item-3">
            <MdLocationOn />
            <p className="details">{location}</p>
          </div>
          <div className="details-item-3">
            <BsFillBriefcaseFill />
            <p className="details">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
