import React from 'react';
import Student from './Student'


const Group = props => {
  let students
  if (props.students) {
    students = props.students.map(student => {
      return(
        <Student
          key={student.id}
          name={student.name}
        />
      )
    })
  }

  return(
    <div className="small-4 columns group">
      <p className="group-name">
        {props.name}
      </p>
      <ul className="group-list">
        {students}
      </ul>
    </div>
  )
}

export default Group;
