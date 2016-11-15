import React from 'react'
import ReactDOM from 'react-dom'
import TicTac from '../components/TicTac/tictac.js'
import { Button } from 'antd'

class Game extends React.Component {
	render() {
		return (
			<div>
				<TicTac />
			</div>
		)
	}
}

export default Game
