
var Map = function(){

	// return status of given location(i, j) | status: 0 - not occupied, 1 - tic, 2 - tac
	this.getItemStatus = function(block, item) {

	}

	// change location status of given location(i, j)
	this.setItemStatus = function(block, item, status) {

	}

	// return status of given block | status: 0 - not occupied, 1 - tic, 2 - tac, 3 - draw
	this.getBlockStatus = function(block) {

	}

	// set status of block
	this.setBlockStatus = function(block, status) {

	}

	// returns a bool value if given location is available
	this.isItemAvailable = function(block, item) {

	}

	// returns a bool value if given block is available
	this.isBlockAvailable = function(block, item) {

	}

	// call this to play a step, will call setItemStatus in this method and set other game state.
	this.play = function(block, item, status) {

	}

	// returns a int value represent of next step block constraint, returns null means can put next item any other block
	this.getNextStepBlock = function() {

	}

	// returns a int value after checking block i: status: 0 - not finished, 1 - tic win, 2 - tac win
	this.checkBlock = function(block) {

	}

	// returns a int value after checking entire chess map: status: 0 - not finished, 1 - tic win, 2 - tac win
	this.check = function() {

	}

	// render chess map
	this.render = function() {

	}

}
