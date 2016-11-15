import Map from './map'
import React from 'react'

let current = false
let mapSize = 750
let mapColor = '#66CCFF'
let ticColor = '#66CCFF'
let tacColor = '#66CCFF'
let drawColor = '#66CCFF'
let itemSize = mapSize / 9
let blockSize = mapSize / 3
let inactiveColor = '#AAAAAA'
let inactiveBlur = 0.5

const game = new Map()

const corrdinateToPosition = (x, y) => {
	const length = mapSize / 9
	const mapX = Math.floor(x / length)
	const mapY = Math.floor(y / length)
	let block = Math.floor(mapX / 3) + Math.floor(mapY / 3) * 3
	let item = (mapX % 3) + (mapY % 3) * 3
	return {block, item}
}

class TicTac extends React.Component {

	constructor(props) {
		super(props)
		this.onClick = this.onClick.bind(this)
	}

	componentDidMount() {
		this.ctx = this.mapCanvas.getContext('2d')
		this.mapCanvas.width = mapSize
		this.mapCanvas.height = mapSize

		this.drawMap(mapSize)
		this.drawInactive(250, 250, 250, '#AAAAAA', 0.5)
	}

	onClick(e) {
		console.log(e)
		const {block, item} = corrdinateToPosition(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
		//const {x, y} = getMapPosition({x: e.offsetX, y: e.offsetY})
		if (current) {
			this.playTicAnimation(block, item)
		} else {
			this.playTacAnimation(block, item)
		}
		current = !current
	}



	positionToCorrdinate(block, item) {
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
			this.ctx.moveTo(x + lineSpace, y + i * length)
			this.ctx.lineTo(x + boxSize - lineSpace, y + i * length)
		}
		this.ctx.lineWidth = lineWidth
		this.ctx.strokeStyle = lineColor
		this.ctx.lineCap = 'round'
		this.ctx.closePath()
		this.ctx.stroke()
	}

	drawMap(mapSize) {
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
	}

	drawInactive(x, y, size, color, blur) {
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
			} else {
				if(ticX2 > maxX2 && ticY2 < maxY2) {
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
				}
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

	playTicAnimation(block, item) {
		const {x, y} = this.positionToCorrdinate(block, item)
		this.drawTicAnimation(x, y, itemSize, ticColor)
	}

	playTacAnimation(block, item) {
		const {x, y} = this.positionToCorrdinate(block, item)
		this.drawTacAnimation(x, y, itemSize, tacColor)
	}

	playDrawAnimation(block) {
		const {x, y} = this.positionToCorrdinate(block, 0)
		this.drawDrawAnimation(x, y, blockSize, drawColor)
	}

	playInactive(block) {
		const {x, y} = this.positionToCorrdinate(block, 0)
		this.drawInactive(x, y, blockSize, inactiveColor, inactiveBlur)
	}


	render() {
		return (
			<canvas width='750' height = '750' ref={ canvas => this.mapCanvas = canvas } onClick={this.onClick}/>
		)
	}
}


export default TicTac
