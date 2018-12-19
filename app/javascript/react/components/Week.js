import React from 'react';
import Group from './Group'


const Week = props => {
  let groups
  if (props.groups) {
    groups = props.groups.map(group => {
      return(
        <Group
          key={group.id}
          name={group.name}
          students={group.students}
        />
      )
    })
  }

  return(
    <div className="row">
      <p>
        {props.name}
      </p>
      <div className="row">
        {groups}
      </div>
    </div>
  )
}

export default Week;
