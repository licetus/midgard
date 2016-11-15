import Map from './map.js'
import React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Header from './components/Header/Header.js'
import ReactDOM from 'react-dom'
import App from './routes/app.js'
import Index from './routes/index.js'
import Game from './routes/game.js'
import Download from './routes/download.js'
import About from './routes/about.js'
import NoMatch from './routes/noMatch.js'
import { Button } from 'antd'


ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<Route path="index" component={Index}/>
			<Route path="game" component={Game}/>
			<Route path="download" component={Download}/>
			<Route path="about" component={About}/>
			<Route path="*" component={NoMatch}/>
		</Route>
	</Router>
), document.getElementById('main'))

// const map = new Map()
console.log(Map.draw)
