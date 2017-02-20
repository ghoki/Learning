import React from 'react'
import ReactDOM from 'react-dom'
import './css/default.css'

const { render } = ReactDOM

// .. the JSX way :
render(
	<h1 id='title'
		className='header'
		style={{backgroundColor: 'orange', color: 'white', fontFamily: 'verdana'}}>
	Hello World	2
	</h1>,
	document.getElementById('react-container')
);
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