import React from 'react';
import { Provider } from 'react-redux'
import { Router, browserHistory, Route } from 'react-router'

import CohortsIndexContainer from '../containers/CohortsIndexContainer';

export const App = (props) => {
  return (
    <Provider store={props.store}>
      <Router history={browserHistory}>
        <Route path='/cohorts' component={CohortsIndexContainer} />
      </Router>
    </Provider>
  )
}

export default App
