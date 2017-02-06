import React from 'react';
import ReactDOM from 'react-dom';

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
                    <h2>event stuff</h2>
                    <AppEvents update={this.update.bind(this)} />
                    <hr />
                    <h2>"higher order component"</h2>
                    <AppRefComponent />
                    <hr />
                    <h2>component mounting stuff</h2>
                    <AppMountingWrapper />
                    <hr />
                    <h2>component update checker / should update run ?</h2>
                    <div id="makachecker">
                    <AppUpdateChecker val={0} />
                    </div>
                    <hr />
                    <h2>Array data stuff</h2>
                    <AppDataStuff />
                </div>
                <hr />
                <h2>Array data stuff</h2>
                <AppHOC />
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

//================================================================================
// .. Use lifecycle - mounting
class AppMounting extends React.Component {
    constructor(){
        super();
        this.state = {val: 0}
        this.update = this.update.bind(this)
    }
    update(e){
        this.setState({val: this.state.val +1})
    }

    
    componentWillMount () {
        console.log('componentWillMount')
        this.setState({m:2})
    }
   
    render () {
        console.log('render');
        return (
        <div>
             <button onClick={this.update}>{this.state.val * this.state.m}</button>
        </div>
        )
        
    }

    componentDidMount () {
        console.log('componentDidMount');
        console.log(ReactDOM.findDOMNode(this))
        this.inc = setInterval(this.update, 500)
    }    

    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.inc);
    }
}

class AppMountingWrapper extends React.Component {
    mount(){
        ReactDOM.render(<AppMounting />, document.getElementById('a'))        
    }
    unmount(){
        ReactDOM.unmountComponentAtNode(document.getElementById('a'))
    }
    render() {
        return (
            <div>
               <button onClick={this.mount.bind(this)}>Mount</button> 
               <button onClick={this.unmount.bind(this)}>UnMount</button>
               <div id="a"></div>
            </div>
        );
    }
}


//================================================================================
// .. update render skip !
class AppUpdateChecker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {increasing: false}
    }

    update(){
        ReactDOM.render(
            <AppUpdateChecker val={this.props.val+1} />
            ,
            document.getElementById('makachecker')
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({increasing: nextProps.val > this.props.val})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.val % 5 === 0;
    }

    render() {
        console.log('this.state.increasing:' + this.state.increasing)

        return (
            <div>
                <button onClick={this.update.bind(this)}>{this.props.val}</button>
            </div>
        );
    }
}

//================================================================================
// .. data stuff / arrays
class AppDataStuff extends React.Component {
    constructor(){
        super();
        this.state = {items: []}
    }
    
    componentWillMount () {
        fetch('http://swapi.co/api/people/?format=json')
        .then(response => response.json() )
        .then( ({results: items}) => {this.setState({items})})
    }
    
    filter(e){
        this.setState({filter: e.target.value})
    }

    render() {
        let items = this.state.items;
        if (this.state.filter) {
            items = items.filter( item=>item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        }

        return (
            <div>
                <input type="text" onChange={this.filter.bind(this)} />
                { items.map(item=>
                <h4 key={item.name}>{item.name}</h4>)
                }
            </div>
        );
    }
}


//================================================================================
// .. component bridge / derived / extension .. "higher order component"

const HOCer = (InnerComponent) => class extends React.Component {
    constructor(){
        super();
        this.state = {count: 0}
    }
    update(){
        this.setState({count: this.state.count+1})
    }
    componentWillMount () {
        console.log('HOCer will mount')
    }
    render(){
        return (
            <InnerComponent 
            {...this.props}
            {...this.state}
            update={this.update.bind(this)}
            />
        )
    }
    
}

class AppHOC extends React.Component {
    render(){ return (<div>
                <MyButton>ein bütton</MyButton>
                <hr />
                <MyHOCLabel>ün laibel</MyHOCLabel>
            </div>
    )}
}


const MyButton = HOCer((props) => 
    <button onClick={props.update}>{props.children} - {props.count}</button> )

class MyLabel extends React.Component{
    componentWillMount () {
        console.log('MyLabel will mount')
    }
    render(){
        return <label onMouseMove={this.props.update}>{this.props.children} - {this.props.count}</label>
    }
}

const MyHOCLabel = HOCer(MyLabel)




export default App
