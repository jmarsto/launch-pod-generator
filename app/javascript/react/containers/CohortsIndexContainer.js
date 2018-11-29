import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewCohortFormContainer from './NewCohortFormContainer'
import CohortListContainer from './CohortListContainer'

class CohortsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row">
        <div className="small-6 columns">
          <CohortListContainer />
        </div>
        <div className="small-6 columns">
          <NewCohortFormContainer />
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cohorts: state.cohorts
  }
}

export default connect(
  mapStateToProps,
  null
)(CohortsIndexContainer)
