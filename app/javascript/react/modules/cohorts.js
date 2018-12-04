const initialState = {
  cohorts: [],
  isFetching: false
};

const cohorts = (state = initialState, action) => {
  switch(action.type) {
    case HANDLE_INPUT_CHANGE:
      return {...state, [action.field]: action.newValue }
    case ADD_COHORT:
      const newCohortList = state.cohorts.concat(action.cohort)
      return {...state, cohorts: newCohortList }
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

const ADD_COHORT = 'ADD_COHORT'

const addCohort = (cohort) => {
  return {
    type: ADD_COHORT,
    cohort
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

const getCohorts = () => {
  return dispatch => {
    dispatch(getCohortsRequest())

    return fetch(`/api/v1/cohorts.json`)
    .then(respnse => {
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

export {
  cohorts,
  getCohorts,
  addCohort,
  clearForm,
  handleInputChange
};
