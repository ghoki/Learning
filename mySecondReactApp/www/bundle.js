'use strict';

var _ReactDOM = ReactDOM,
    render = _ReactDOM.render;

// .. the JSX way :

render(React.createElement(
	'h1',
	{ id: 'title',
		className: 'header',
		style: { backgroundColor: 'orange', color: 'white', fontFamily: 'verdana' } },
	'Hello World'
), document.getElementById('react-container'));
/*

// .. the core way :
const { createElement } = React

const title = createElement(
	'h1',
	{id: 'title', className: 'header'},
	'Hello World'
)

render(
	title,
	document.getElementById('react-container')
)

*/
