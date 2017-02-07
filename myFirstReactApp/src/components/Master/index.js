/* eslint-disable */
import React, { PropTypes, Component } from 'react';
//import classnames from 'classnames';
import Nav from './nav';
import './style.css';

export default class Master extends Component {
  render() {
    const { className, ...props } = this.props;
    return (
      //<div className={classnames('Master', className)} {...props}>
      <div>
        <Nav />
        <hr />
        {this.props.children}
      </div>
    );
  }
}