import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import Group from '../components/Group'
import { patchWeek } from '../modules/cohorts';

class WeekContainer extends Component {
  constructor(props) {
    super(props)

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd = (result) => {
    const oldGroupId = result.source.droppableId
    const newGroupId = result.destination.droppableId
    if(newGroupId && oldGroupId !== newGroupId) {
      const payload = {
        newGroupId,
        groupingId: result.draggableId,
        weekId: this.props.id
      }
      this.props.patchWeek(payload)
    }
  }

  render() {
    let groups
    if (this.props.groups) {
      groups = this.props.groups.map(group => {
        return(
          <Group
            key={group.id}
            id={group.id}
            name={group.name}
            groupings={group.groupings}
            students={this.props.students}
          />
        )
      })
    }

    return(
      <div className="row week">
      <p className="week-name">
      Road Mapping Week {this.props.name}
      </p>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="row">
          {groups}
        </div>
      </DragDropContext>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    students: state.cohorts.cohortShowData.students
  }
}

const mapDispatchToProps = dispatch => {
  return {
    patchWeek: (payload) => dispatch(patchWeek(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeekContainer)
