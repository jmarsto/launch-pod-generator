import React from 'react';
import { Provider } from 'react-redux'
import { Router, browserHistory, Route } from 'react-router'

import CohortsIndexContainer from '../containers/CohortsIndexContainer';
import CohortShowContainer from '../containers/CohortShowContainer';

export const App = (props) => {
  return (
    <Provider store={props.store}>
      <Router history={browserHistory}>
        <Route path='/' component={CohortsIndexContainer} />
        <Route path='/cohorts' component={CohortsIndexContainer} />
        <Route path='/cohorts/:id' component={CohortShowContainer} />
      </Router>
    </Provider>
  )
}

export default App
