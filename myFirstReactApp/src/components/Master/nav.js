/* eslint-disable */
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router'
import classnames from 'classnames';
import './style.css';

export default class Nav extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('Nav', className)} {...props}>
       <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/app/7/kaka maka">App</Link></li>
          <li><Link to="/">Default alias Home or Start! </Link></li>
        </ul>
      </div>
    );
  }
}
 