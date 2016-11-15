import Map from './map'
const game = new Map()
const mapCanvas = document.getElementById('mapCanvas')
const ctx = mapCanvas.getContext('2d')
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

mapCanvas.width = mapSize
mapCanvas.height = mapSize

mapCanvas.addEventListener('click', e => {
	const {block, item} = corrdinateToPosition(e.offsetX, e.offsetY)
	//const {x, y} = getMapPosition({x: e.offsetX, y: e.offsetY})
	if (current) {
		playTicAnimation(block, item)
	} else {
		playTacAnimation(block, item)
	}
	current = !current
})


const corrdinateToPosition = (x, y) => {
	const length = mapSize / 9
	const mapX = Math.floor(x / length)
	const mapY = Math.floor(y / length)
	let block = Math.floor(mapX / 3) + Math.floor(mapY / 3) * 3
	let item = (mapX % 3) + (mapY % 3) * 3
	return {block, item}
}

const positionToCorrdinate = (block, item) => {
	const length = mapSize / 9
	const posX = (block % 3) * 3 + (item % 3)
	const posY = Math.floor(block / 3) * 3 + Math.floor(item / 3)
	return {x: posX * length, y: posY * length}
}

const drawBox = (x, y, boxSize, lineSpace, lineWidth, lineColor) => {
	const length = boxSize / 3
	ctx.beginPath()
	for (let i = 1; i < 3; i++) {
		ctx.moveTo(x + i * length, y + lineSpace)
		ctx.lineTo(x + i * length, y + boxSize - lineSpace)
		ctx.moveTo(x + lineSpace, y + i * length)
		ctx.lineTo(x + boxSize - lineSpace, y + i * length)
	}
	ctx.lineWidth = lineWidth
	ctx.strokeStyle = lineColor
	ctx.lineCap = 'round'
	ctx.closePath()
	ctx.stroke()
}

const drawMap = (mapSize) => {
	const mapSpace = mapSize * 0.02
	const boxLineWidth = mapSize / 75
	drawBox(0, 0, mapSize, mapSpace, boxLineWidth, mapColor)
	const blockSize = mapSize / 3
	const blockLineWidth = boxLineWidth / 2
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			drawBox(i * blockSize, j * blockSize, blockSize, mapSpace, blockLineWidth, '#66CCFF')
		}
	}
}

const drawTic = (x, y, size, color) => {
	const ticSpace = size * 0.2
	const width = size / 8
	ctx.beginPath()
	ctx.moveTo(x + ticSpace, y + ticSpace)
	ctx.lineTo(x + size - ticSpace, y + size - ticSpace)
	ctx.moveTo(x + size - ticSpace, y + ticSpace)
	ctx.lineTo(x + ticSpace, y + size - ticSpace)
	ctx.strokeStyle = color
	ctx.lineWidth = width
	ctx.lineCap = 'butt'
	ctx.globalAlpha = 1
	ctx.closePath()
}

const drawTac = (x, y, size, color) => {
	const tacSpace = size * 0.2
	const width = size / 8
	const tacR = (size - 2 * tacSpace) / 2
	const tacX = x + size / 2
	const tacY = y + size / 2
	ctx.beginPath()
	ctx.arc(tacX, tacY, tacR, Math.PI, 3 * Math.PI)
	ctx.strokeStyle = color
	ctx.lineWidth = width
	ctx.globalAlpha = 1
	ctx.closePath()
}

const drawDraw = (x, y, size, color) => {
	const drawSpace = size * 0.1
	const width = size / 8
	const drawX = x + drawSpace
	const drawY = y + size / 2
	const maxX = x + size - drawSpace
	ctx.beginPath()
	ctx.moveTo(drawX, drawY)
	ctx.lineTo(maxX, drawY)
	ctx.strokeStyle = color
	ctx.lineWidth = width
	ctx.lineCap = 'butt'
	ctx.globalAlpha = 1
	ctx.closePath()
}

const drawInactive = (x, y, size, color, blur) => {
	const drawSpace = mapSize / 150
	ctx.beginPath()
	ctx.fillStyle = color
	ctx.globalAlpha = blur
	ctx.fillRect(x + drawSpace, y + drawSpace, size - 2 * drawSpace, size - 2 * drawSpace)
	ctx.closePath()
}

const drawTicAnimation = (x, y, size, color) => {
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
			ctx.beginPath()
			ctx.moveTo(ticX1, ticY1)
			ticX1 += step
			if (ticX1 >= maxX1) {
				ticX1 = maxX1
			}
			ticY1 += step
			if (ticY1 > maxY1) {
				ticY1 = maxY1
			}
			ctx.lineTo(ticX1, ticY1)
			ctx.strokeStyle = color
			ctx.lineWidth = width
			ctx.lineCap = 'butt'
			ctx.globalAlpha = 1
			ctx.closePath()
			ctx.stroke()
			//console.log('x1: ', ticX1, ' y1: ', ticY1)
			requestAnimationFrame(draw)
		} else {
			if(ticX2 > maxX2 && ticY2 < maxY2) {
				ctx.beginPath()
				ctx.moveTo(ticX2, ticY2)
				ticX2 -= step
				if (ticX2 <= maxX2) {
					ticX2 = maxX2
				}
				ticY2 += step
				if (ticY2 > maxY2) {
					ticY2 = maxY2
				}
				ctx.lineTo(ticX2, ticY2)
				ctx.strokeStyle = color
				ctx.lineWidth = width
				ctx.lineCap = 'butt'
				ctx.closePath()
				ctx.stroke()
				//console.log('x2: ', ticX2, ' y2: ', ticY2)
				requestAnimationFrame(draw)
			}
		}
	}
	draw()
}

const drawTacAnimation = (x, y, size, color) => {
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
			ctx.beginPath()
			ctx.arc(tacX, tacY, tacR, startAngle, startAngle += step)
			ctx.strokeStyle = color
			ctx.lineWidth = width
			ctx.globalAlpha = 1
			ctx.closePath()
			ctx.stroke()
			requestAnimationFrame(draw)
		}
	}
	draw()
}

const drawDrawAnimation = (x, y, size, color) => {
	const step = size / 75
	const drawSpace = size * 0.1
	const width = size / 8
	let drawX = x + drawSpace
	let drawY = y + size / 2
	const maxX = x + size - drawSpace
	const draw = () => {
		if (drawX <= maxX) {
			ctx.beginPath()
			ctx.moveTo(drawX, drawY)
			ctx.lineTo(drawX += step, drawY)
			ctx.strokeStyle = color
			ctx.lineWidth = width
			ctx.lineCap = 'butt'
			ctx.globalAlpha = 1
			ctx.closePath()
			ctx.stroke()
			console.log('x: ', drawX, ' y: ', drawY)
			requestAnimationFrame(draw)
		}
	}
	draw()
}

const drawInactiveAnimation = (x, y, size, color, blur) => {

}

const playTicAnimation = (block, item) => {
	const {x, y} = positionToCorrdinate(block, item)
	drawTicAnimation(x, y, itemSize, ticColor)
}

const playTacAnimation = (block, item) => {
	const {x, y} = positionToCorrdinate(block, item)
	drawTacAnimation(x, y, itemSize, tacColor)
}

const playDrawAnimation = (block) => {
	const {x, y} = positionToCorrdinate(block, 0)
	drawDrawAnimation(x, y, blockSize, drawColor)
}

const playInactive = (block) => {
	const {x, y} = positionToCorrdinate(block, 0)
	drawInactive(x, y, blockSize, inactiveColor, inactiveBlur)
}



drawMap(mapSize)
game.setItemStatus(4, 4, tac)
console.log(game.getItemStatus(4, 4))
drawInactive(250, 250, 250, '#AAAAAA', 0.5)
