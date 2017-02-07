/* eslint-disable */
import React from 'react';
//import {Router, Route} from 'react-router';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

import Master from './components/Master';
import Default from './default';
import App from './components/App';
import AppJSX from './components/AppJSX';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Master}>
        <IndexRoute component={Default}/>
        <Route path="/app/:someNum/:someTxt" component={App} />
        <Route path="/jsx" component={AppJSX} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;