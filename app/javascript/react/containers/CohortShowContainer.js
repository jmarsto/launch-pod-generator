import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getCohortShowData } from '../modules/cohorts';
import StudentListContainer from './StudentListContainer'
import NewStudentFormContainer from './NewStudentFormContainer'

class CohortShowContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCohortShowData(this.props.params.id);
  }

  render() {
    return (
      <div className="row">
        <h2>{this.props.cohortShowData.cohort.name}</h2>
        <StudentListContainer />
        <NewStudentFormContainer />
        <Link to='/cohorts'>Back to All Cohorts</Link>
      </div>
    )
  }

}



const mapStateToProps = (state) => {
  return {
    cohortShowData: state.cohorts.cohortShowData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCohortShowData: (id) => dispatch(getCohortShowData(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CohortShowContainer)
