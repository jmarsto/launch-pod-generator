import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInputChange, addCohort, clearForm } from '../modules/cohorts';

import InputField from '../components/InputField';

class NewCohortFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.calculateNewId = this.calculateNewId.bind(this);
  }

  calculateNewId() {
    if (this.props.cohorts.cohorts.length === 0) {
      return 1;
    } else {
      const cohortIds = this.props.cohorts.cohorts.map(cohort => cohort.id);
      return Math.max(...cohortIds) + 1;
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const newCohort = {
      id: this.calculateNewId(),
      name: this.props.newCohort
    };
    this.props.addCohort(newCohort);
    this.props.clearForm();
  }

  render() {
    return (
      <div>
        <h1>form container</h1>
        <form onSubmit={this.handleFormSubmit}>
          <InputField
            key='newCohort'
            label='Cohort Name'
            type='text'
            name='newCohort'
            handleChange={this.props.handleInputChange}
            value={this.props.newCohort}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cohorts: state.cohorts,
    newCohort: state.cohorts.newCohort
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (event) => dispatch(handleInputChange(event)),
    addCohort: (newCohort) => dispatch(addCohort(newCohort)),
    clearForm: () => dispatch(clearForm())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCohortFormContainer)
