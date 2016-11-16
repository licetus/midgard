export default class Map {
	static available = 0
	static playing = 0
	static tic = 1
	static tac = 4
	static draw = 16
	static allBlock = -1
	constructor() {
		this.currentPlayer = Map.tic
		this.ticSteps = 0
		this.tacSteps = 0
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

	// return status of given block | status: 0 - available, 1 - tic, 4 - tac, 16 - draw
	getBlockStatus(block) {
		return this.blockStatus[block]
	}
	// set status of block
	setBlockStatus(block, status) {
		this.blockStatus[block] = status
	}

	// returns a int value represent of next step block constraint, returns null means can put next item any other block
	getActiveBlock() {
		return this.activeBlock
	}
	setActiveBlock(block) {
		this.activeBlock = block
	}

	getCurrentPlayer() {
		return this.currentPlayer
	}
	setCurrentPlayer(currentPlayer) {
		this.currentPlayer = currentPlayer
	}

	// returns a bool value if given location is available
	isItemAvailable(block, item) {
		return this.getItemStatus(block, item) === Map.available ? true : false
	}

	// returns a bool value if given block is available
	isBlockAvailable(block) {
		return this.getBlockStatus(block) === Map.available ? true : false
	}

	isBlockActive(block) {
		let thisGetActiveBlock = this.getActiveBlock()
		return (thisGetActiveBlock === block || thisGetActiveBlock === Map.allBlock) ? true : false
	}

	checkLocation(block, item) {
		if (block >= 0 && block <= 8 && item >= 0 && item <= 8) {
			return true
		}
		return false //error code : 300 location is not available
	}

	count(count) {
		if (count === Map.tic * 3) {
			return Map.tic
		} else if (count === Map.tac * 3) {
			return Map.tac
		} else {
			return Map.available
		}
	}
	checkRow(arr) {
		for (let i = 0; i < 9; i += 3) {
			let count = 0
			for (let j = 0; j < 3; j++) {
				count += arr[i + j]
			}
			let thisCount = this.count(count)
			if (thisCount !== Map.available) {
				return thisCount
			}
		}
		return Map.available
	}
	checkColumn(arr) {
		for (let i = 0; i < 3; i++) {
			let count = 0
			for (let j = 0; j < 9; j += 3) {
				count += arr[i + j]
			}
			let thisCount = this.count(count)
			if (thisCount !== Map.available) {
				return thisCount
			}
		}
		return Map.available
	}
	checkDiagonal(arr) {
		let count = 0
		for (let i = 0; i < 12; i += 4) {
			count += arr[i]
		}
		let thisCount = this.count(count)
		if (thisCount !== Map.available) {
			return thisCount
		}

		count = 0
		for (let i = 2; i < 8; i += 2) {
			count += arr[i]
		}
		thisCount = this.count(count)
		if (thisCount !== Map.available) {
			return thisCount
		}
		return Map.available
	}

	checkArray(arr) {
		let thisCheckRow = this.checkRow(arr)
		let thisCheckColumn = this.checkColumn(arr)
		let thisCheckDiagonal = this.checkDiagonal(arr)
		if (thisCheckRow !== Map.available) {
			return thisCheckRow
		} else if (thisCheckColumn !== Map.available) {
			return thisCheckColumn
		} else if (thisCheckDiagonal !== Map.available) {
			return thisCheckDiagonal
		} else {
			for (let i = 0; i < 9; i++) {
				if (arr[i] === Map.available) {
					return Map.available
				}
			}
			return Map.draw
		}
	}

	// returns a int value after checking block i: status: 0 - not finished, 1 - tic win, 4 - tac win, 16 - draw
	checkBlock(block) {
		return this.checkArray(this.map[block])
	}

	// returns a int value after checking entire chess this.map: status: 0 - not finished, 1 - tic win, 4 - tac win, 16- draw
	check() {
		return this.checkArray(this.blockStatus)
	}

	playCheck(block, item) {
		if (this.isBlockActive(block) === false) {
			return false //TODO: error code : 400 - block is not active
		} else if (this.isBlockAvailable(block) === false) {
			return false //TODO: error code : 401 - block is not available
		} else if (this.isItemAvailable(block, item) === false) {
			return false //TODO: error code : 402 - item is not available
		}
		return true
	}

	playerCheck(status) {
		if (status === this.currentPlayer) {
			return true
		}
		return false //TODO: error code : 500 - wrong player
	}

	winCheck() {
		let thisCheck = this.check()
		if (thisCheck !== Map.available) {
			return thisCheck
		}
		return Map.playing
	}


	reset() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				this.map[i][j] = Map.available
			}
			this.setBlockStatus(i, Map.available)
		}
		this.setActiveBlock(Map.allBlock)
		this.currentPlayer = Map.tic
		this.ticSteps = 0
		this.tacSteps = 0
	}

	changeSteps(currentPlayer) {
		if(currentPlayer === Map.tic) {
			this.ticSteps += 1
		} else if (currentPlayer === Map.tac) {
			this.tacSteps += 1
		}
	}
	changePlayer(currentPlayer) {
		if (currentPlayer === Map.tic) {
			this.setCurrentPlayer(Map.tac)
		} else if (currentPlayer === Map.tac) {
			this.setCurrentPlayer(Map.tic)
		}
	}

	updateStatus(block, item, status) {
		this.setItemStatus(block, item, status)
		this.setBlockStatus(block, this.checkBlock(block))
		this.setActiveBlock(this.getBlockStatus(item) === Map.available ? item : Map.allBlock)
		this.changePlayer(status)
		this.changeSteps(status)
	}


	// call this to play a step, will call setItemStatus in this method and set other game state.
	play(block, item, status) {
		//winCheck
		let thisWinCheck = this.winCheck()
		if (thisWinCheck !== Map.playing) {
			return thisWinCheck
		}
		//locationCheck
		if (this.checkLocation(block, item) === false || this.playerCheck(status) === false || this.playCheck(block, item) === false) {
			return false
		}
		// console.log('Block: ' + block + ' item: ' + item + ' itemStatus:' + status + ', next active Block is ' + this.getActiveBlock())
		return true
	}


}
