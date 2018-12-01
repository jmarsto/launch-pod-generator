const initialState = {
  cohorts: []
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

const cohorts = (state = initialState, action) => {
  switch(action.type) {
    case HANDLE_INPUT_CHANGE:
      return {...state, [action.field]: action.newValue }
    case ADD_COHORT:
      const newCohortList = state.cohorts.concat(action.cohort)
      return {...state, cohorts: newCohortList }
    case CLEAR_FORM:
      return {...state, newCohort: '' }
    default:
      return state;
  }
};

export {
  cohorts,
  addCohort,
  clearForm,
  handleInputChange
};
