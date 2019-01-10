import React from 'react';
import Student from './Student'
import { Droppable } from 'react-beautiful-dnd';

const Group = props => {
  let students
  if (props.groupings) {
    students = props.groupings.map((grouping, index) => {
      const student = props.students.find(student => student.id === grouping.student_id)
      if (!student) {
        return
      }

      return(
        <Student
          key={grouping.id}
          id={grouping.id}
          name={student.name}
          index={index}
        />
      )
    })
  }

  const droppableContent = provided => {
    return(
      <ul
        className="group-list"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {students}
        {provided.placeholder}
      </ul>
    )
  }

  return(
    <div className="small-4 columns group">
      <p className="group-name">
        {props.name}
      </p>
      <Droppable droppableId={`${props.id}`}>
        {droppableContent}
      </Droppable>
    </div>
  )
}

export default Group;
