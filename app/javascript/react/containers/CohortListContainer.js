import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCohorts } from '../modules/cohorts'
import CohortTile from '../components/CohortTile'

class CohortListContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getCohorts()
  }

  render() {
    let cohortTiles
    if (this.props.cohorts) {
      cohortTiles = this.props.cohorts.map(cohort => {
        return (
          <CohortTile
            key={cohort.id}
            id={cohort.id}
            name={cohort.name}
          />
        )
      })
    }

    return (
      <div>
        <h2>Select a Cohort</h2>
        <ul className="cohort-list">
          {cohortTiles}
        </ul>
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
