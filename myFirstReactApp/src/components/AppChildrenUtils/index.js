/* eslint-disable */
import React, { Component } from 'react';
import classnames from 'classnames';
import './style.css';

class AppChildrenUtils extends Component {
    render() {
        return (
            <div>
                <AppChildrenUtilsParent> 
                    <div className="ChildA"></div>
                    <div className="ChildB"></div>
                    <div className="ChildC"></div>
                </AppChildrenUtilsParent>

                <hr />
                <h1>cloneElement for more fun with childrens</h1>
                
                <AppCloneChilds />
            </div>

        );
    }
}

class AppCloneChilds extends Component {
    render() {
        return (
                <AppCloneChildsButtons>
                    <button value="A">A</button>
                    <button value="B">B</button>
                    <button value="C">C</button>
                </AppCloneChildsButtons>
        );
    }
}

class AppCloneChildsButtons extends Component {
    constructor() {
        super();
        this.state = {selected: 'None'}
    }
    selectItem(selected){
        this.setState({selected: selected})
    }
    render() {

        let fn = child => 
            React.cloneElement(child, { 
                onClick: this.selectItem.bind(this, child.props.value)
            })

        let items = React.Children.map() .map(this.props.children, fn)

        return (
            <div>
                <h2>You have Selected {this.state.selected}</h2>
                {items}
            </div>
        );
    }
}





class AppChildrenUtilsParent extends Component {
    render() {
        /*
        .. sofern hier nur ein element forhanden ist , ist children ein objekt und kein arrach. 
        ! obacht, react hat etwas mitgebracht ^^
        console.log(this.props.children);
        let items = this.props.children
            .map(child => child);
        */
        /*
        .. läuft, aber es geht NOCH toller ^^
        let items= React.Children
            .map(this.props.children, child => child)
        */
        let items1 = React.Children.toArray(this.props.children);

        console.log(items1);

        let items2 = React.Children.forEach(this.props.children, child => console.log(child.props.className));

        return null
    }   
}





export default AppChildrenUtils;