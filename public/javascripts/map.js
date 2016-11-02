
var Map = function(){

	// return status of given location(i, j) | status: 0 - not occupied, 1 - tic, 2 - tac
	this.getItemStatus = function(i, j) {

	}

	// change location status of given location(i, j)
	this.setItemStatus = function(i, j, status) {

	}

	// call this to play a step, will call setItemStatus in this method and set other game state.
	this.play = function(i, j, status) {

	}

	// returns a int value represent of next step block constraint, returns null means can put next item any other block
	this.getNextStepBlock = function() {

	}

	// returns a int value after checking parent block i: status: 0 - not finished, 1 - tic win, 2 - tac win
	this.checkBlock = function(i) {

	}

	// returns a int value after checking entire chess map: status: 0 - not finished, 1 - tic win, 2 - tac win
	this.check = function() {

	}

	// render chess map
	this.render = function() {

	}

}
