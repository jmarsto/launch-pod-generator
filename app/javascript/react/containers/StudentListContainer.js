import React, { Component } from 'react';

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
      <div className="small-8 columns">
        <h3>Students</h3>
        <ul>
          {studentTiles}
        </ul>
      </div>
    )
  }

}


export default StudentListContainer
