const initialState = {
  cohorts: [],
  isFetching: false,
  cohortShowData: {
    id: null,
    name: "",
    students: [],
    weeks: []
    }
};

const cohorts = (state = initialState, action) => {
  switch(action.type) {
    case HANDLE_INPUT_CHANGE:
      return {...state, [action.field]: action.newValue }
    case CLEAR_FORM:
      return {...state, newCohort: '', newStudent: '' }
    case REQUEST:
      return {...state, isFetching: true }
    case REQUEST_FAILURE:
      return {...state, isFetching: false }
    case GET_COHORTS_REQUEST_SUCCESS:
      return {...state,
        cohorts: action.cohorts,
        isFetching: false
      }
    case POST_COHORT_REQUEST_SUCCESS:
      const newCohorts = state.cohorts.concat(action.cohort)
      return {...state,
        cohorts: newCohorts,
        isFetching: false
      }
    case GET_COHORT_SHOW_DATA_SUCCESS:
      return {...state,
        cohortShowData: action.cohortShowData,
        isFetching: false
      }
    case POST_STUDENT_REQUEST_SUCCESS:
      const newStudents = state.cohortShowData.students.concat(action.student)
      const newCohortShowData = {...state.cohortShowData, students: newStudents }
      return {...state,
        cohortShowData: newCohortShowData,
        isFetching: false
      }
    case DELETE_STUDENT_REQUEST_SUCCESS:
      const studentsAfterDelete = state.cohortShowData.students.filter(function(student) {
        return student.id !== parseInt(action.studentId)
      })
      const cohortDataAfterDelete = {...state.cohortShowData, students: studentsAfterDelete }
      return {...state,
        cohortShowData: cohortDataAfterDelete,
        isFetching: false
      }
    case GENERATE_GROUPS_REQUEST_SUCCESS:
      const cohortShowDataWithGroups = {...state.cohortShowData, weeks: action.weeks }
      return {...state,
        cohortShowData: cohortShowDataWithGroups,
        isFetching: false
      }
    case PATCH_WEEK_REQUEST_SUCCESS:
      const weeks = Array.from(state.cohortShowData.weeks)
      const patchedWeekIndex = weeks.findIndex(week => week.id === action.week.id)
      weeks.splice(patchedWeekIndex, 1, action.week)
      const cohortShowDataWithUpdatedWeeks = {...state.cohortShowData, weeks: weeks }
      return {...state.cohort,
        cohortShowData: cohortShowDataWithUpdatedWeeks,
        isFetching: false
      }
    default:
      return state;
  }
};

const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE'

const handleInputChange = event => {
  const field = event.target.name
  const newValue = event.target.value
  return {
    type: HANDLE_INPUT_CHANGE,
    field,
    newValue
  }
}

const CLEAR_FORM = 'CLEAR_FORM'

const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

const REQUEST = 'REQUEST'

const request = () => {
  return {
    type: REQUEST
  }
}

const GET_COHORTS_REQUEST_SUCCESS = 'GET_COHORTS_REQUEST_SUCCESS'

const getCohortsRequestSuccess = cohorts => {
  return {
    type: GET_COHORTS_REQUEST_SUCCESS,
    cohorts
  }
}

const REQUEST_FAILURE = 'REQUEST_FAILURE'

const requestFailure = () => {
  return {
    type: REQUEST_FAILURE
  }
}

const POST_COHORT_REQUEST_SUCCESS = 'POST_COHORT_REQUEST_SUCCESS'

const postCohortRequestSuccess = cohort => {
  return {
    type: POST_COHORT_REQUEST_SUCCESS,
    cohort
  }
}

const GET_COHORT_SHOW_DATA_SUCCESS = 'GET_COHORT_SHOW_DATA_SUCCESS'

const getCohortShowDataSuccess = cohortShowData => {
  return {
    type: GET_COHORT_SHOW_DATA_SUCCESS,
    cohortShowData
  }
}

const POST_STUDENT_REQUEST_SUCCESS = 'POST_STUDENT_REQUEST_SUCCESS'

const postStudentRequestSuccess = student => {
  return {
    type: POST_STUDENT_REQUEST_SUCCESS,
    student
  }
}

const DELETE_STUDENT_REQUEST_SUCCESS = 'DELETE_STUDENT_REQUEST_SUCCESS'

const deleteStudentRequestSuccess = (studentId) => {
  return {
    type: DELETE_STUDENT_REQUEST_SUCCESS,
    studentId
  }
}

const GENERATE_GROUPS_REQUEST_SUCCESS = 'GENERATE_GROUPS_REQUEST_SUCCESS'

const generateGroupsRequestSuccess = (weeks) => {
  return {
    type: GENERATE_GROUPS_REQUEST_SUCCESS,
    weeks
  }
}

const PATCH_WEEK_REQUEST_SUCCESS = 'PATCH_WEEK_REQUEST_SUCCESS'

const patchWeekRequestSuccess = week => {
  return {
    type: PATCH_WEEK_REQUEST_SUCCESS,
    week
  }
}

const getCohorts = () => {
  return dispatch => {
    dispatch(request())

    return fetch(`/api/v1/cohorts.json`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(requestFailure())
        console.log("Error in fetch");
        return { error: 'Something went wrong.' }
      }
    })
    .then(cohorts => {
      if(!cohorts.error) {
        dispatch(getCohortsRequestSuccess(cohorts))
      }
    })
  }
}

const postCohort = cohort => {
  return dispatch => {
    dispatch(request())
    return fetch(`/api/v1/cohorts.json`,
      {
        method: 'POST',
        body: JSON.stringify(cohort),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(requestFailure())
        console.log("Error in fetch");
        return { error: 'Something went wrong.' }
      }
    })
    .then(cohort => {
      if(!cohort.error) {
        dispatch(postCohortRequestSuccess(cohort))
      }
    })
  }
}

const patchWeek = payload => {
  return dispatch => {
    dispatch(request())
    return fetch(`/api/v1/weeks/${payload.weekId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(requestFailure())
        console.log("Error in fetch");
        return { error: 'Something went wrong.' }
      }
    })
    .then(week => {
      if(!week.error) {
        dispatch(patchWeekRequestSuccess(week))
      }
    })
  }
}

const getCohortShowData = id => {
  return dispatch => {
    dispatch(request())
    return fetch(`/api/v1/cohorts/${id}.json`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(requestFailure())
        console.log("Error in fetch");
        return { error: 'Something went wrong.' }
      }
    })
    .then(cohortShowData => {
      if(!cohortShowData.error) {
        dispatch(getCohortShowDataSuccess(cohortShowData))
      }
    })
  }
}

const postStudent = studentData => {
  return dispatch => {
    dispatch(request())
    return fetch(`/api/v1/cohorts/${studentData.cohortId}/students.json`,
      {
        method: 'POST',
        body: JSON.stringify(studentData),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(requestFailure())
        console.log("Error in fetch");
        return { error: 'Something went wrong.' }
      }
    })
    .then(student => {
      if(!student.error) {
        dispatch(postStudentRequestSuccess(student))
      }
    })
  }
}

const deleteStudent = (cohortId, studentId) => {
  return dispatch => {
    dispatch(request())
    return fetch(`/api/v1/cohorts/${cohortId}/students/${studentId}.json`,
      {
        method: 'DELETE',
        body: JSON.stringify(studentId),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(requestFailure())
        console.log("Error in fetch");
        return { error: 'Something went wrong.' }
      }
    })
    .then(studentId => {
      if(!studentId.error) {
        dispatch(deleteStudentRequestSuccess(studentId))
      }
    })
  }
}

const requestGroupsForCohort = (cohortId) => {
  return dispatch => {
    dispatch(request())
    return fetch(`/api/v1/cohorts/${cohortId}/groups.json`,
      {
        method: 'POST',
        body: JSON.stringify(cohortId),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(requestFailure())
        console.log("Error in fetch");
        return { error: 'Something went wrong.' }
      }
    })
    .then(weeks => {
      if(!weeks.error) {
        dispatch(generateGroupsRequestSuccess(weeks))
      }
    })
  }
}

export {
  cohorts,
  cohortShowData,
  getCohorts,
  patchWeek,
  postCohort,
  postStudent,
  deleteStudent,
  getCohortShowData,
  requestGroupsForCohort,
  clearForm,
  handleInputChange
};
