
const mapCanvas = document.getElementById('mapCanvas')
const ctx = mapCanvas.getContext('2d')
const tic = 1
const tac = 4
const draw = 16
let current = false
let mapSize = 750

mapCanvas.width = mapSize
mapCanvas.height = mapSize



mapCanvas.addEventListener('click', e => {
	const size = mapSize / 9
	const color = '66CCFF'
	const {x, y} = getMapPosition({x: e.offsetX, y: e.offsetY})
	if (current) {
		drawItem(x, y, size, color, tic)
	} else {
		drawItem(x, y, size, color, tac)
	}
	current = !current
})

const getMapPosition = ({x, y}) => {
	const length = mapSize / 9
	return {x: Math.floor(x / length) * length, y: Math.floor(y / length) * length}
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
	drawBox(0, 0, mapSize, mapSpace, boxLineWidth, '#66CCFF')
	const blockSize = mapSize / 3
	const blockLineWidth = boxLineWidth / 2
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			drawBox(i * blockSize, j * blockSize, blockSize, mapSpace, blockLineWidth, '#66CCFF')
		}
	}
}

const drawTic = (x, y, size, color) => {
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

const drawTac = (x, y, size, color) => {
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
			ctx.closePath()
			ctx.stroke()
			requestAnimationFrame(draw)
		}
	}
	draw()
}

const drawDraw = (x, y, size, color) => {
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
			ctx.closePath()
			ctx.stroke()
			console.log('x: ', drawX, ' y: ', drawY)
			requestAnimationFrame(draw)
		}
	}
	draw()
}

const drawItem = (x, y, size, color, item) => {
	if (item === tic) {
		drawTic(x, y, size, color)
	} else if (item === tac) {
		drawTac(x, y, size, color)
	} else if (item === draw) {
		drawDraw(x, y, size, color)
	}
}


drawMap(mapSize)
