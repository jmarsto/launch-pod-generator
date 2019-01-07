import React, { Component } from 'react';

import { connect } from 'react-redux';

import WeekContainer from './WeekContainer'
import { requestGroupsForCohort } from '../modules/cohorts';

class GroupsContainer extends Component {
  constructor(props) {
    super(props);

    this.generateGroups = this.generateGroups.bind(this);
  }

  generateGroups = () => {
    this.props.requestGroupsForCohort(this.props.cohortId)
  }

  render() {
    let weeks;
    if (this.props.weeks) {
      weeks = this.props.weeks.map(week => {
        return (
          <WeekContainer
            key={week.id}
            id={week.id}
            name={week.name}
            groups={week.groups}
          />
        )
      })
    }

    return (
      <div className="row">
        <h3 className="small-12 columns groups-header">Groups Container</h3>
        <button onClick={this.generateGroups} className="small-12 columns">Generate Groups!</button>
        <div className="small-12 columns">
          {weeks}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cohortId: state.cohorts.cohortShowData.id,
    weeks: state.cohorts.cohortShowData.weeks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestGroupsForCohort: (cohortId) => dispatch(requestGroupsForCohort(cohortId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsContainer)
