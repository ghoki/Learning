/* eslint-disable */
import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import './style.css';

export default class Default extends Component {

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Default', className)} {...props}>
        <h1>
          Willkommen auf der Spielwiese !
        </h1>
      </div>
    );
  }
}