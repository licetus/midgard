import React from 'react'
import Header from '../components/Header/Header.js'
import ReactDOM from 'react-dom'
import { Button } from 'antd'

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div class='content'>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default App
