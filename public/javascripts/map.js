export default class Map {
	static empty = 0
	static tic = 1
	static tac = 4
	static draw = 16

	constructor() {
		this.map = new Array(9)
		this.blockStatus = new Array(9)
		for (let i = 0; i < 9; i++) {
			this.map[i] = new Array(9)
			this.blockStatus[i] = Map.empty
			for (let j = 0; j < 9; j++) {
				this.map[i][j] = Map.empty
			}
		}

		this.activeBlock = -1
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
		return this.getItemStatus(block, item) === 0 ? true : false
	}

	// returns a bool value if given block is available
	isBlockAvailable(block) {
		return this.getBlockStatus(block) === 0 ? true : false
	}

	updateStatus() {

	}

	// returns a int value represent of next step block constraint, returns null means can put next item any other block
	getActiveBlock() {
		return this.activeBlock
	}

	count(count) {
		if (count === 3) {
			return 1
		} else if (count === 12) {
			return 4
		} else {
			return 0
		}
	}

	rowCheck(arr) {
		for (let i = 0; i < 9; i += 3) {
			let count = 0
			for (let j = 0; j < 3; j++) {
				count += arr[i + j]
			}
			if (this.count(count) !== 0) {
				return this.count(count)
			}
		}
		return 0
	}

	columnCheck(arr) {
		for (let i = 0; i < 3; i++) {
			let count = 0
			for (let j = 0; j < 9; j += 3) {
				count += arr[i + j]
			}
			if (this.count(count) !== 0) {
				return this.count(count)
			}
		}
		return 0
	}

	diagonalCheck(arr) {
		let count = 0
		for (let i = 0; i < 12; i += 4) {
			count += arr[i]
		}
		if (this.count(count) !== 0) {
			return this.count(count)
		} else {
			count = 0
			for (let i = 2; i < 8; i += 2) {
				count += arr[i]
			}
			if (this.count(count) !== 0) {
				return this.count(count)
			} else {
				return 0
			}
		}
	}

	// returns a int value after checking block i: status: 0 - not finished, 1 - tic win, 2 - tac win
	checkBlock(block) {
		if (this.rowCheck(this.map[block]) !== 0) {
			return this.rowCheck(this.map[block])
		} else if (this.columnCheck(this.map[block]) !== 0) {
			return this.columnCheck(this.map[block])
		} else if (this.diagonalCheck(this.map[block]) !== 0) {
			return this.diagonalCheck(this.map[block])
		} else {
			return 0
		}
	}

	// returns a int value after checking entire chess this.map: status: 0 - not finished, 1 - tic win, 2 - tac win
	check() {

	}
	reset() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.map[i][j] = 0
			}
			this.blockStatus[i] = 0
		}
		this.activeBlock = -1
	}

	// call this to play a step, will call setItemStatus in this method and set other game state.
	play(block, item, status) {
		if (this.isBlockAvailable(block) === false) {
			console.log('Block is not available')
		} else if (this.isItemAvailable(block, item) === false) {
			console.log('Item is not available')
		} else {
			this.setItemStatus(block, item, status)
			console.log('Block ' + block + ' status is ' + status + ', next active Block is ' + item)
			this.activeBlock = this.blockStatus[item] === 0 ? item : -1
			this.updateStatus()
		}
	}

	// render chess this.map
	render() {

	}
}

var module = module || {}
if (module) { module.exports = Map }
