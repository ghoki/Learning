/* eslint-disable */
import React, { Component } from 'react';
import classnames from 'classnames';
import './style.css';

class AppJCX extends Component {
    constructor(){
        super();
        this.state = {
            input: '/* add your jsx here */'
            ,output: ''
            ,err: ''
        }
    }
    update(e) {
        let code = e.target.value;
        try {
            this.setState({
                output: window.Babel
                .transform(code, {presets: ['es2015', 'react']})
                .code,
                err: ''
            })
        } catch (err) {
            this.setState({err: err.message})
        }
    }
    render() {
        const { className, ...props } = this.props;
        return (
            <div>

                <h2><a href="https://facebook.github.io/react/docs/introducing-jsx.html">React: Introducing JSX</a></h2>
                <h2><a href="https://facebook.github.io/react/docs/jsx-in-depth.html">React: JSX in dept</a></h2>
                <hr />
                <header>{this.state.err}</header>
                <div className="container">
                    <textarea 
                        onChange={this.update.bind(this)}
                        defaultValue={this.state.input}/>
                    <pre>
                        {this.state.output}
                    </pre>
                </div>
                <p>Babel engine used to translate above: http://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.1/babel.min.js</p>
            </div>
        );
    }
}

export default AppJCX;