const initialState = {
  cohorts: [],
  isFetching: false,
  cohortShowData: {
    cohort: {
      name: ""
    }
  }
};

const cohorts = (state = initialState, action) => {
  switch(action.type) {
    case HANDLE_INPUT_CHANGE:
      return {...state, [action.field]: action.newValue }
    case CLEAR_FORM:
      return {...state, newCohort: '' }
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

export {
  cohorts,
  cohortShowData,
  getCohorts,
  postCohort,
  getCohortShowData,
  clearForm,
  handleInputChange
};
