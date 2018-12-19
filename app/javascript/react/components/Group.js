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
    <div className="small-4 columns">
      <p>
        {props.name}
      </p>
      <ul>
        {students}
      </ul>
    </div>
  )
}

export default Group;
