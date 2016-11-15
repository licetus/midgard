import { Menu, Icon, Row, Col } from 'antd'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import React from 'react'
import './Header.css'

class Header extends React.Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			current: 'home'
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		console.log('click ', e)
		this.setState({
			current: e.key,
		})
	}

	render() {
		return (
			<header className='header'>
				<Row>
					<Menu onClick = {this.handleClick} selectedKeys = {[this.state.current]} mode = 'horizontal' >
						<Menu.Item key = 'home'>
							<Icon type = 'home' /> Home
						</Menu.Item>
						<Menu.Item key = 'game' >
							<Icon type = 'android' /> Game
						</Menu.Item>
						<Menu.Item key = 'download' >
							<Icon type = 'download' /> Download
						</Menu.Item>
						<Menu.Item key = 'about' >
							<Icon type = 'solution' /> About
						</Menu.Item>
					</Menu>
				</Row>
			</header>
		)
	}
}

export default Header
