import React, { Component } from 'react';
import { connect } from 'react-redux';

class CohortListContainer extends Component {
  constructor(props) {
    super(props)
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

export default connect(
  mapStateToProps,
  null
)(CohortListContainer)
