import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCohorts } from '../modules/cohorts'

class CohortListContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCohorts()
  }

  render() {
    const cohortTiles = this.props.cohorts.map(cohort => {
      return (
        <div key={cohort.id}>
        {cohort.name}
        </div>
      )
    })

    return (
      <div>
        <h3>Cohort List Container</h3>
        {cohortTiles}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    cohorts: state.cohorts.cohorts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCohorts: () => dispatch(getCohorts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CohortListContainer)
