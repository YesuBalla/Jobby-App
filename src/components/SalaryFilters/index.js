import './index.css'

const SalaryFilters = props => {
  const {salaryRange, onChangeSalary} = props
  const {salaryRangeId, label} = salaryRange
  const onClickSalaryRange = event => {
    onChangeSalary(event.target.value)
  }
  return (
    <li className="label-container">
      <input
        type="radio"
        id={salaryRangeId}
        onChange={onClickSalaryRange}
        value={salaryRangeId}
        name="salaryRange"
      />
      <label htmlFor={salaryRangeId} className="filter-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryFilters
