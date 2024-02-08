import {Component} from 'react'

import './index.css'

class EmploymentFilters extends Component {
  onClickEmployment = event => {
    const {onChangeEmployment} = this.props
    onChangeEmployment(event)
  }

  render() {
    const {typeOfEmployment} = this.props
    const {employmentTypeId, label} = typeOfEmployment
    return (
      <li className="label-container">
        <input
          type="checkbox"
          id={employmentTypeId}
          onChange={this.onClickEmployment}
          value={employmentTypeId}
        />
        <label htmlFor={employmentTypeId} className="filter-label">
          {label}
        </label>
      </li>
    )
  }
}

export default EmploymentFilters
