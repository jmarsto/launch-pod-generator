import React, { Component } from 'react';
import { connect } from 'react-redux';

class StudentListContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let studentTiles
    if (this.props.students) {

      studentTiles = this.props.students.map(student => {
        return (
          <div key={student.id}>
            {student.name}
          </div>
        )
      })
    }

    return (
      <div>
        <h3>Students</h3>
        <ul>
          {studentTiles}
        </ul>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentListContainer)
