import React from 'react'
import ReactDOM from 'react-dom'

import Background from './components/Background'
import Clock from './components/Clock'
import Weather from './Components/Weather'

import './styles/index.scss'

ReactDOM.render(
	<React.Fragment>
        <Clock/>
        <Weather/>
        <Background/>
    </React.Fragment>,
	document.getElementById('root')
)
