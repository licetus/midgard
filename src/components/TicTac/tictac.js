import Map from './map'
import React from 'react'


let current = false

const map = new Map()

class TicTac extends React.Component {
	constructor(props) {
		super(props)
		this.onClick = this.onClick.bind(this)
		this.state = {
			mapSize: 750,
			backgroundColor: '#FFFFFF',
			mapColor: '#66CCFF',
			ticColor: '#66CCFF',
			tacColor: '#66CCFF',
			drawColor: '#66CCFF',
			inactiveColor: '#AAAAAA',
			inactiveBlur: 0.5
		}
		this.itemSize = this.state.mapSize / 9
		this.blockSize = this.state.mapSize / 3
	}

	componentDidMount() {
		this.ctx = this.mapCanvas.getContext('2d')
		this.mapCanvas.width = this.state.mapSize
		this.mapCanvas.height = this.state.mapSize
		this.draw()
	}

	onClick(e) {
		console.log(e)
		const mapSize = this.state.mapSize
		let {block, item} = this.corrdinateToPosition(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
		let status = map.getCurrentPlayer()
		let mapPlay = map.play(block, item, status)
		if (mapPlay === false) {
			console.log('Location error')
		}else if (mapPlay !== true) {
			console.log('winner is ', mapPlay)
			this.playGameOverAnimation(mapPlay)
		}else if (mapPlay === true) {
			this.playItemAnimation(block, item, status)
			map.updateStatus(block, item, status)
		}
	}

	corrdinateToPosition(x, y) {
		const mapSize = this.state.mapSize
		const length = mapSize / 9
		const mapX = Math.floor(x / length)
		const mapY = Math.floor(y / length)
		let block = Math.floor(mapX / 3) + Math.floor(mapY / 3) * 3
		let item = (mapX % 3) + (mapY % 3) * 3
		return {block, item}
	}

	positionToCorrdinate(block, item) {
		const mapSize = this.state.mapSize
		const length = mapSize / 9
		const posX = (block % 3) * 3 + (item % 3)
		const posY = Math.floor(block / 3) * 3 + Math.floor(item / 3)
		return {x: posX * length, y: posY * length}
	}

	drawBox(x, y, boxSize, lineSpace, lineWidth, lineColor) {
		const length = boxSize / 3
		this.ctx.beginPath()
		for (let i = 1; i < 3; i++) {
			this.ctx.moveTo(x + i * length, y + lineSpace)
			this.ctx.lineTo(x + i * length, y + boxSize - lineSpace)
			this.ctx.lineCap = 'round'
			this.ctx.moveTo(x + lineSpace, y + i * length)
			this.ctx.lineTo(x + boxSize - lineSpace, y + i * length)
			this.ctx.lineCap = 'round'
		}
		this.ctx.lineWidth = lineWidth
		this.ctx.strokeStyle = lineColor
		this.ctx.closePath()
		this.ctx.stroke()
	}

	drawMap() {
		const mapSize = this.state.mapSize
		const mapColor = this.state.mapColor
		const mapSpace = mapSize * 0.02
		const boxLineWidth = mapSize / 75
		this.drawBox(0, 0, mapSize, mapSpace, boxLineWidth, mapColor)
		const blockSize = mapSize / 3
		const blockLineWidth = boxLineWidth / 2
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this.drawBox(i * blockSize, j * blockSize, blockSize, mapSpace, blockLineWidth, '#66CCFF')
			}
		}
	}

	drawTic(x, y, size, color) {
		const ticSpace = size * 0.2
		const width = size / 8
		this.ctx.beginPath()
		this.ctx.moveTo(x + ticSpace, y + ticSpace)
		this.ctx.lineTo(x + size - ticSpace, y + size - ticSpace)
		this.ctx.moveTo(x + size - ticSpace, y + ticSpace)
		this.ctx.lineTo(x + ticSpace, y + size - ticSpace)
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width
		this.ctx.lineCap = 'butt'
		this.ctx.globalAlpha = 1
		this.ctx.closePath()
		this.ctx.stroke()

	}

	drawTac(x, y, size, color) {
		const tacSpace = size * 0.2
		const width = size / 8
		const tacR = (size - 2 * tacSpace) / 2
		const tacX = x + size / 2
		const tacY = y + size / 2
		this.ctx.beginPath()
		this.ctx.arc(tacX, tacY, tacR, Math.PI, 3 * Math.PI)
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width
		this.ctx.globalAlpha = 1
		this.ctx.closePath()
		this.ctx.stroke()
	}

	drawDraw(x, y, size, color) {
		const drawSpace = size * 0.1
		const width = size / 8
		const drawX = x + drawSpace
		const drawY = y + size / 2
		const maxX = x + size - drawSpace
		this.ctx.beginPath()
		this.ctx.moveTo(drawX, drawY)
		this.ctx.lineTo(maxX, drawY)
		this.ctx.strokeStyle = color
		this.ctx.lineWidth = width
		this.ctx.lineCap = 'butt'
		this.ctx.globalAlpha = 1
		this.ctx.closePath()
		this.ctx.stroke()
	}

	drawInactive(x, y, size, color, blur) {
		const mapSize = this.state.mapSize
		const drawSpace = mapSize / 150
		this.ctx.beginPath()
		this.ctx.fillStyle = color
		this.ctx.globalAlpha = blur
		this.ctx.fillRect(x + drawSpace, y + drawSpace, size - 2 * drawSpace, size - 2 * drawSpace)
		this.ctx.closePath()
	}

	drawTicAnimation(x, y, size, color) {
		const step = size / 50
		const ticSpace = size * 0.2
		const width = size / 8
		let ticX1 = x + ticSpace
		let ticY1 = y + ticSpace
		const maxX1 = x + size - ticSpace
		const maxY1 = y + size - ticSpace
		let ticX2 = maxX1
		let ticY2 = ticY1
		const maxX2 = ticX1
		const maxY2 = maxY1
		const draw = () => {
			if (ticX1 < maxX1 && ticY1 < maxY1) {
				this.ctx.beginPath()
				this.ctx.moveTo(ticX1, ticY1)
				ticX1 += step
				if (ticX1 >= maxX1) {
					ticX1 = maxX1
				}
				ticY1 += step
				if (ticY1 > maxY1) {
					ticY1 = maxY1
				}
				this.ctx.lineTo(ticX1, ticY1)
				this.ctx.strokeStyle = color
				this.ctx.lineWidth = width
				this.ctx.lineCap = 'butt'
				this.ctx.globalAlpha = 1
				this.ctx.closePath()
				this.ctx.stroke()
				//console.log('x1: ', ticX1, ' y1: ', ticY1)
				requestAnimationFrame(draw)
			} else if(ticX2 > maxX2 && ticY2 < maxY2) {
				this.ctx.beginPath()
				this.ctx.moveTo(ticX2, ticY2)
				ticX2 -= step
				if (ticX2 <= maxX2) {
					ticX2 = maxX2
				}
				ticY2 += step
				if (ticY2 > maxY2) {
					ticY2 = maxY2
				}
				this.ctx.lineTo(ticX2, ticY2)
				this.ctx.strokeStyle = color
				this.ctx.lineWidth = width
				this.ctx.lineCap = 'butt'
				this.ctx.closePath()
				this.ctx.stroke()
				//console.log('x2: ', ticX2, ' y2: ', ticY2)
				requestAnimationFrame(draw)
			} else {
				this.draw()
			}
		}
		draw()
	}

	drawTacAnimation(x, y, size, color) {
		const step = 0.1
		const tacSpace = size * 0.2
		const width = size / 8
		const tacR = (size - 2 * tacSpace) / 2
		const tacX = x + size / 2
		const tacY = y + size / 2
		let startAngle = Math.PI
		const endAngle = 3 * Math.PI
		const draw = () => {
			if (startAngle <= endAngle) {
				this.ctx.beginPath()
				this.ctx.arc(tacX, tacY, tacR, startAngle, startAngle += step)
				this.ctx.strokeStyle = color
				this.ctx.lineWidth = width
				this.ctx.globalAlpha = 1
				this.ctx.closePath()
				this.ctx.stroke()
				requestAnimationFrame(draw)
			} else {
				this.draw()
			}
		}
		draw()
	}

	drawDrawAnimation(x, y, size, color) {
		const step = size / 75
		const drawSpace = size * 0.1
		const width = size / 8
		let drawX = x + drawSpace
		let drawY = y + size / 2
		const maxX = x + size - drawSpace
		const draw = () => {
			if (drawX <= maxX) {
				this.ctx.beginPath()
				this.ctx.moveTo(drawX, drawY)
				this.ctx.lineTo(drawX += step, drawY)
				this.ctx.strokeStyle = color
				this.ctx.lineWidth = width
				this.ctx.lineCap = 'butt'
				this.ctx.globalAlpha = 1
				this.ctx.closePath()
				this.ctx.stroke()
				console.log('x: ', drawX, ' y: ', drawY)
				requestAnimationFrame(draw)
			}
		}
		draw()
	}

	drawInactiveAnimation(x, y, size, color, blur) {

	}

	drawMapItems() {
		const itemSize = this.itemSize
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				let status = map.getItemStatus(i, j)
				let {x, y} = this.positionToCorrdinate(i, j)
				if (status === Map.tic) {
					const ticColor = this.state.ticColor
					this.drawTic(x, y, itemSize, ticColor)
				}else if (status === Map.tac) {
					const tacColor = this.state.tacColor
					this.drawTac(x, y, itemSize, tacColor)
				}
			}
		}
	}

	drawMapBlocks() {
		const blockSize = this.blockSize
		for (let i = 0; i < 9; i++) {
			let status = map.getBlockStatus(i)
			let {x, y} = this.positionToCorrdinate(i, 0)
			if (status === Map.tic) {
				const ticColor = this.state.ticColor
				this.drawTic(x, y, blockSize, ticColor)
			}else if (status === Map.tac) {
				const tacColor = this.state.tacColor
				this.drawTac(x, y, blockSize, tacColor)
			}else if (status === Map.draw) {
				const drawColor = this.state.drawColor
				this.drawDraw(x, y, blockSize, drawColor)
			}
		}
	}

	drawMapInactiveBlocks() {
		const blockSize = this.blockSize
		const inactiveColor = this.state.inactiveColor
		const inactiveBlur = this.state.inactiveBlur
		const mapGetActiveBlock = map.getActiveBlock()
		if (mapGetActiveBlock !== Map.allBlock) {
			for (let i = 0; i < 9; i++) {
				if (mapGetActiveBlock !== i) {
					let {x, y} = this.positionToCorrdinate(i, 0)
					this.drawInactive(x, y, blockSize, inactiveColor, inactiveBlur)
				}
			}
		}

	}

	clearCanvas() {
		const canvasSize = this.state.mapSize
		this.ctx.fillStyle = this.state.backgroundColor
		this.ctx.fillRect (0, 0, canvasSize, canvasSize)
	}

	draw() {
		this.clearCanvas()
		this.ctx.stroke()
		this.drawMap()
		this.ctx.stroke()
		this.drawMapItems()
		this.ctx.stroke()
		this.drawMapInactiveBlocks()
		this.ctx.stroke()
		this.drawMapBlocks()
		this.ctx.stroke()
	}



	playTicAnimation(block, item) {
		const itemSize = this.itemSize
		const ticColor = this.state.ticColor
		const {x, y} = this.positionToCorrdinate(block, item)
		this.drawTicAnimation(x, y, itemSize, ticColor)
	}

	playTacAnimation(block, item) {
		const itemSize = this.itemSize
		const tacColor = this.state.tacColor
		const {x, y} = this.positionToCorrdinate(block, item)
		this.drawTacAnimation(x, y, itemSize, tacColor)
	}

	playItemAnimation(block, item, status) {
		if(status === Map.tic) {
			this.playTicAnimation(block, item)
		}
		if (status === Map.tac) {
			this.playTacAnimation(block, item)
		}
	}

	playDrawAnimation(block) {
		const blockSize = this.blockSize
		const drawColor = this.state.drawColor
		const {x, y} = this.positionToCorrdinate(block, 0)
		this.drawDrawAnimation(x, y, blockSize, drawColor)
	}

	playInactiveAnimation(block) {
		const blockSize = this.blockSize
		const inactiveColor = this.state.inactiveColor
		const inactiveBlur = this.state.inactiveBlur
		const {x, y} = this.positionToCorrdinate(block, 0)
		this.drawInactiveAnimation(x, y, blockSize, inactiveColor, inactiveBlur)
	}

	playGameOverAnimation(status) {

	}



	render() {
		return (
			<canvas ref={ canvas => this.mapCanvas = canvas } onClick={this.onClick}/>
		)
	}
}


export default TicTac
