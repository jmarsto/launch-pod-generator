import React from 'react';
import { Router, browserHistory, Route } from 'react-router'
import CohortsIndexContainer from '../containers/CohortsIndexContainer';

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/cohorts' component={CohortsIndexContainer} />
    </Router>
  )
}

export default App
