import React from 'react';
import { Draggable } from 'react-beautiful-dnd'


const Student = props => {
  const draggableContent = (provided, snapshot) => {
    return(
      <li
        className="student-name"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
        {props.name}
      </li>
    )
  }
  return(
    <Draggable draggableId={`${props.id}`} index={props.index}>
      {draggableContent}
    </Draggable>
  )
}

export default Student;
