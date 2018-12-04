import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInputChange, postCohort, clearForm } from '../modules/cohorts';

import InputField from '../components/InputField';

class NewCohortFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const cohortData = {
      name: this.props.newCohort
    }
    this.props.postCohort(cohortData);
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
    postCohort: (newCohort) => dispatch(postCohort(newCohort)),
    clearForm: () => dispatch(clearForm())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCohortFormContainer)
