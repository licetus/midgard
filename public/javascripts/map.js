export default class Map {
	static empty = 0
	static tic = 1
	static tac = 4
	static draw = 16
	static allBlock = -1
	constructor() {
		this.map = new Array(9)
		this.blockStatus = new Array(9)
		for (let i = 0; i < 9; i++) {
			this.map[i] = new Array(9)
		}
		this.activeBlock = Map.allBlock
		this.reset()
	}

	getItemStatus(block, item) {
		return this.map[block][item]
	}

	// change location status of given location(i, j)
	setItemStatus(block, item, status) {
		this.map[block][item] = status
	}

	// return status of given block | status: 0 - empty, 1 - tic, 4 - tac, 16 - draw
	getBlockStatus(block) {
		return this.blockStatus[block]
	}

	// set status of block
	setBlockStatus(block, status) {
		this.blockStatus[block] = status
	}

	// returns a bool value if given location is available
	isItemAvailable(block, item) {
		return this.getItemStatus(block, item) === Map.empty ? true : false
	}

	// returns a bool value if given block is available
	isBlockAvailable(block) {
		return this.getBlockStatus(block) === Map.empty ? true : false
	}

	updateStatus() {

	}

	// returns a int value represent of next step block constraint, returns null means can put next item any other block
	getActiveBlock() {
		return this.activeBlock
	}
	setActiveBlock(block) {
		this.activeBlock = block
	}

	count(count) {
		if (count === 3) {
			return Map.tic
		} else if (count === 12) {
			return Map.tac
		} else {
			return Map.empty
		}
	}

	rowCheck(arr) {
		for (let i = 0; i < 9; i += 3) {
			let count = 0
			for (let j = 0; j < 3; j++) {
				count += arr[i + j]
			}
			let thisCount = this.count(count)
			if (thisCount !== Map.empty) {
				return thisCount
			}
		}
		return Map.empty
	}

	columnCheck(arr) {
		for (let i = 0; i < 3; i++) {
			let count = 0
			for (let j = 0; j < 9; j += 3) {
				count += arr[i + j]
			}
			let thisCount = this.count(count)
			if (thisCount !== Map.empty) {
				return thisCount
			}
		}
		return Map.empty
	}

	diagonalCheck(arr) {
		let count = 0
		for (let i = 0; i < 12; i += 4) {
			count += arr[i]
		}
		let thisCount = this.count(count)
		if (thisCount !== Map.empty) {
			return thisCount
		}

		count = 0
		for (let i = 2; i < 8; i += 2) {
			count += arr[i]
		}
		thisCount = this.count(count)
		if (thisCount !== Map.empty) {
			return thisCount
		}
		return Map.empty
	}

	// returns a int value after checking block i: status: 0 - not finished, 1 - tic win, 2 - tac win
	checkBlock(block) {
		let thisRowCheck = this.rowCheck(this.map[block])
		let thisColumnCheck = this.columnCheck(this.map[block])
		let thisDiagonalCheck = this.diagonalCheck(this.map[block])
		if (thisRowCheck !== Map.empty) {
			return thisRowCheck
		} else if (thisColumnCheck !== Map.empty) {
			return thisColumnCheck
		} else if (thisDiagonalCheck !== Map.empty) {
			return thisDiagonalCheck
		} else {
			for (let i = 0; i < 9; i++) {
				if (this.getItemStatus(block, i) === Map.empty) {
					return Map.empty
				}
			}
			return Map.draw
		}
	}

	// returns a int value after checking entire chess this.map: status: 0 - not finished, 1 - tic win, 2 - tac win
	check() {

	}
	reset() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.map[i][j] = Map.empty
			}
			this.blockStatus[i] = Map.empty
		}
		this.setActiveBlock(Map.allBlock)
	}

	// call this to play a step, will call setItemStatus in this method and set other game state.
	play(block, item, status) {
		if (this.isBlockAvailable(block) === false) {
			console.log('Block is not available')
		} else if (this.getActiveBlock() !== block && this.getActiveBlock() !== Map.allBlock) {
			console.log('Block is not active')
		} else if (this.isItemAvailable(block, item) === false) {
			console.log('Item is not available')
		} else {
			this.setItemStatus(block, item, status)
			this.setBlockStatus(block, this.checkBlock(block))
			this.setActiveBlock(this.getBlockStatus(item) === Map.empty ? item : Map.allBlock)
			console.log('Block: ' + block + ' item: ' + item + ' itemStatus:' + status + ', next active Block is ' + this.getActiveBlock())
			this.updateStatus()
		}
	}

	checkStep(block, item, status) {

	}

	// render chess this.map
	render() {

	}
}

var module = module || {}
if (module) { module.exports = Map }
