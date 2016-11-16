import { Menu, Icon, Row, Col } from 'antd'
import { Link } from 'react-router'
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
							<Icon type = 'home' /> <Link className='menu-link' to='/index'>Home</Link>
						</Menu.Item>
						<Menu.Item key = 'game' >
							<Icon type = 'android' /> <Link className='menu-link' to='/game'>Game</Link>
						</Menu.Item>
						<Menu.Item key = 'download' >
							<Icon type = 'download' /> <Link className='menu-link' to='/download'>Download</Link>
						</Menu.Item>
						<Menu.Item key = 'about' >
							<Icon type = 'solution' /> <Link className='menu-link' to='/about'>About</Link>
						</Menu.Item>
					</Menu>
				</Row>
			</header>
		)
	}
}

export default Header
