import React, { Component } from 'react';

import { connect } from 'react-redux';

import { deleteStudent } from '../modules/cohorts'


class StudentListContainer extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    let studentTiles
    if (this.props.students) {

      studentTiles = this.props.students.map(student => {
        const deleteStudent = () => {
          this.props.deleteStudent(this.props.cohortId, student.id)
        }
        return (
          <div key={student.id}>
            {student.name}
            <span className="remove" id={student.id} onClick={deleteStudent}>(Remove)</span>
          </div>
        )
      })
    }

    return (
      <div className="small-8 columns">
        <h3>Students</h3>
        <ul>
          {studentTiles}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (cohortId, studentId) => dispatch(deleteStudent(cohortId, studentId))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(StudentListContainer)
