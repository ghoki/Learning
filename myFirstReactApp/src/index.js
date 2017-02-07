/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
//import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import { browserHistory } from 'react-router'

import Routes from './routes';

import './index.css';

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);





// import App from './App';
// import AppJSX from './AppJSX';
// import AppChildrenUtils from './components/AppChildrenUtils';
// import AppReusableComposableAPIs from './components/AppReusableComposableAPIs';



//ReactDOM.render(
  // <App someNum={11} someTxt="kaka maka" customTxt="1234567" />,
  //   document.getElementById('root')
//);


// ReactDOM.render(
//   <AppJSX />,
//     document.getElementById('root')
// );

// ReactDOM.render(
//   <AppChildrenUtils />,
//     document.getElementById('root')
// );

// ReactDOM.render(
//   <AppReusableComposableAPIs />,
//     document.getElementById('root')
// );

