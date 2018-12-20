import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInputChange, clearForm, postStudent } from '../modules/cohorts';

import InputField from '../components/InputField';

class NewStudentFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let studentData = {
      name: this.props.newStudent,
      cohortId: this.props.cohortId
    }
    this.props.postStudent(studentData);
    this.props.clearForm();
  }

  render() {
    return (
      <div className="small-4 columns">
        <h3>Add Student</h3>
        <form onSubmit={this.handleFormSubmit}>
          <InputField
            key='newStudent'
            label='Student Name'
            type='text'
            name='newStudent'
            handleChange={this.props.handleInputChange}
            value={this.props.newStudent}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    newStudent: state.cohorts.newStudent,
    cohortId: state.cohorts.cohortShowData.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange: (event) => dispatch(handleInputChange(event)),
    clearForm: () => dispatch(clearForm()),
    postStudent: (studentData) => dispatch(postStudent(studentData))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStudentFormContainer)
