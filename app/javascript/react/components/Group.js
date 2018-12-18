import React from 'react';


const Group = props => {
  let students
  if (props.students) {
    students = props.students.map(student => {
      return(
        <li>{student.name}</li>
      )
    })
  }

  return(
    <div className="small-2 columns">
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
