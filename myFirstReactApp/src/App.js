import React from 'react';

// Source: https://egghead.io/courses/react-fundamentals



// .. two ways of components:
// ----------------------
// function : no state
//const App = () => <h1>myReactApp says hello</h1>
// ----------------------
// class : can have state 
// class App extends React.Component {
//     render (){
//         //return <h1>Hello Component</h1>
//         return React.createElement('h1', null, 'Hello Element via Component')
//     }
// }


//================================================================================
//.. sample component class
// + App props and defaults
// + state
// + input bind
// + nested sub component 
class App extends React.Component {
    //.. state with setState
    constructor(){
        super();
        this.state = {
            someTxt: 'kaka maka in state'
            ,someNum: 11
        }
    }

    update(e) {
        this.setState({txt: e.target.value})
    }

    render () {
        var txt = this.props.someTxt;
        var num = this.props.someNum;
        var hideStyle = {display: 'none'}
        return (
            //.. one dom element, but can have as many nested. 
            <div>
                <div style={hideStyle}>
                    <h1>Hello Component {num} <AppHeart />: {this.props.someTxt}</h1>
                    <p>first rule: return only one dom element, with nested many. {txt}</p>
                    <hr />
                    <h2>Statestuff</h2>
                    <input type="text" onChange={this.update.bind(this)} />
                    <h3>someTxt: {this.state.txt} - {this.state.someNum}</h3>
                    <hr />
                    <h2>nested component stuff</h2>
                    <AppInput update={this.update.bind(this)} />
                    <AppButton>I <AppHeart /> kaka maka.</AppButton>
                    <hr />
                </div>
                <h2>event stuff</h2>
                <AppEvents update={this.update.bind(this)} />
                <hr />
                <h2>component reference stuff</h2>
                <AppRefComponent />
            </div>
        )
    }
}

// .. declare App props
App.propTypes = {
    someTxt: React.PropTypes.string.isRequired,
    someNum: React.PropTypes.number.isRequired,
    customTxt(props, propName, component){
        if (!(propName in props)){
            return new Error(`Fucker ! missing ${propName}`)
        }
        if (props[propName].length<5){
            return new Error(`Fucker ! that is way too short ${propName}`)
        }
    }
}
// .. and defaults App props
App.defaultProps = {
    someTxt: "no text defined for someTxt. But ok."
}

//================================================================================
//.. create a simple function components as inputs. to show nesting of components  
const AppInput = (props) => <input type="text" onChange={props.update} /> ;
const AppButton = (props) => <button>{props.children}</button> ;
class AppHeart extends React.Component {
    render(){
        var style = {
            color: 'red',
            fontSize: 50
            };
        return <span style={style}>&hearts;</span>
    }
}

//================================================================================
//.. Normalize events
class AppEvents extends React.Component {
    constructor(){
        super();
        this.state = {currentEvent: '---'}
        this.update = this.update.bind(this)
    }
    update(e){
        this.setState({currentEvent: e.type})
    }
    render(){
        return (
            <div>
            <textarea cols="30" rows="5"
            onBlur={this.update}
            onCopy={this.update}
            onPaste={this.update}
            onKeyPress={this.update}
            onCut={this.update}
            onDoubleClick={this.update}
            onTouchStart={this.update}
            onTouchMove={this.update}
            onTouchEnd={this.update}
            /><h3>{this.state.currentEvent}</h3>
            </div>
        )
    }
}

//================================================================================
// .. Use React ref to Get a Reference to Specific Components
class AppRefComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {a: '', b: '', c: ''}
    }

    update() {
        this.setState(
                {
                    a: this.an.value, // e.target.value,
                    b: this.refs.rb.value, // e.target.value
                    c: this.ac.refs.r2input.value
                }
            )
    }

    render() {
        return (
            <div>
                <input 
                    ref={ node => this.an = node}
                    type="text"
                    onChange={this.update.bind(this)}
                />{this.state.a}
                <hr /> 
                <input 
                    ref="rb"
                    type="text"
                    onChange={this.update.bind(this)}
                />{this.state.b}
                <hr /> 
                <AppRefComponentInput 
                    ref={ component => this.ac = component }
                    update={this.update.bind(this)}
                />{this.state.c}                
            </div>

        )
    }

}
class AppRefComponentInput extends React.Component {
    render() {
        return (
            <div><input ref="r2input" type="text" onChange={this.props.update} /></div>
        )
    }
}


export default App
