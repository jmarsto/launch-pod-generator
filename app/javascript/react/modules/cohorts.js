const initialState = {
  cohorts: [],
  isFetching: false
};

const cohorts = (state = initialState, action) => {
  switch(action.type) {
    case HANDLE_INPUT_CHANGE:
      return {...state, [action.field]: action.newValue }
    case CLEAR_FORM:
      return {...state, newCohort: '' }
    case GET_COHORTS_REQUEST:
      return {...state, isFetching: true }
    case GET_COHORTS_REQUEST_SUCCESS:
      return {...state,
        cohorts: action.cohorts,
        isFetching: false
      }
    case GET_COHORTS_REQUEST_FAILURE:
      return {...state, isFetching: false }
    case POST_COHORT_REQUEST:
      return {...state, isFetching: true }
    case POST_COHORT_REQUEST_SUCCESS:
      const newCohorts = state.cohorts.concat(action.cohort)
      return {...state,
        cohorts: newCohorts,
        isFetching: false
      }
    case POST_COHORT_REQUEST_FAILURE:
      return {...state, isFetching: false }
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

const GET_COHORTS_REQUEST = 'GET_COHORTS_REQUEST'

const getCohortsRequest = () => {
  return {
    type: GET_COHORTS_REQUEST
  }
}

const GET_COHORTS_REQUEST_SUCCESS = 'GET_COHORTS_REQUEST_SUCCESS'

const getCohortsRequestSuccess = cohorts => {
  return {
    type: GET_COHORTS_REQUEST_SUCCESS,
    cohorts
  }
}

const GET_COHORTS_REQUEST_FAILURE = 'GET_COHORTS_REQUEST_FAILURE'

const getCohortsRequestFailure = () => {
  return {
    type: GET_COHORTS_REQUEST_FAILURE
  }
}

const POST_COHORT_REQUEST = 'POST_COHORT_REQUEST'

const postCohortRequest = () => {
  return {
    type: POST_COHORT_REQUEST
  }
}


const POST_COHORT_REQUEST_SUCCESS = 'POST_COHORT_REQUEST_SUCCESS'


const postCohortRequestSuccess = cohort => {
  return {
    type: POST_COHORT_REQUEST_SUCCESS,
    cohort
  }
}

const POST_COHORT_REQUEST_FAILURE = 'POST_COHORT_REQUEST_FAILURE'

const postCohortRequestFailure = () => {
  return {
    type: POST_COHORT_REQUEST_FAILURE
  }
}

const getCohorts = () => {
  return dispatch => {
    dispatch(getCohortsRequest())

    return fetch(`/api/v1/cohorts.json`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(getCohortsRequestFailure())
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
    dispatch(postCohortRequest())
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
        dispatch(postCohortRequestFailure())
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

export {
  cohorts,
  getCohorts,
  postCohort,
  addCohort,
  clearForm,
  handleInputChange
};
