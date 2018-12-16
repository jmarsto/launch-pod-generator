import React, { Component } from 'react';

import { connect } from 'react-redux';
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

    return (
      <div className="row">
        <h3 className="small-12 columns groups-header">Groups Container</h3>
        <button onClick={this.generateGroups} className="small-12 columns">Generate Groups!</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cohortId: state.cohorts.cohortShowData.cohort.id
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
