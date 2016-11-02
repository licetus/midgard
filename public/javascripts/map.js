var Map = function() {
    var empty = 0, tic = 1, tac = 4, draw = 16
    var map = new Array(9)
    for (i = 0; i < 9; i++) {
        map[i] = new Array(9)
    }
    var blockStatus = new Array(9)
    var activeBlock = -1
        // return status of given location(i, j) | status: 0 - empty, 1 - tic, 4 - tac
    this.getItemStatus = function(block, item) {
        return map[block][item]
    }

    // change location status of given location(i, j)
    this.setItemStatus = function(block, item, status) {
        map[block][item] = status
    }

    // return status of given block | status: 0 - empty, 1 - tic, 4 - tac, 16 - draw
    this.getBlockStatus = function(block) {
        return blockStatus[block]
    }

    // set status of block
    this.setBlockStatus = function(block, status) {
        blockStatus[block] = status
    }

    // returns a bool value if given location is available
    this.isItemAvailable = function(block, item) {
        return this.getItemStatus(block, item) === 0 ? true : false
    }

    // returns a bool value if given block is available
    this.isBlockAvailable = function(block) {
        return this.getBlockStatus(block) === 0 ? true : false
    }

    this.updateStatus = function() {


    }

    // returns a int value represent of next step block constraint, returns null means can put next item any other block
    this.getActiveBlock = function() {
        return activeBlock
    }

    this.count = function(count) {
        if (count === 3) {
            return 1
        } else if (count === 12) {
            return 4
        } else {
            return 0
        }
    }

    this.rowCheck = function(arr) {
        for (var i = 0; i < 9; i += 3) {
            var count = 0
            for (var j = 0; j < 3; j++) {
                count += arr[i + j]
            }
            if(this.count(count) !== 0) {
                return this.count(count)
            }
        }
        return 0
    }

    this.columnCheck = function(arr) {
        for (var i = 0; i < 3; i++) {
            var count = 0
            for(var j = 0; j < 9; j += 3) {
                count += arr[i + j]
            }
            if(this.count(count) !== 0) {
                return this.count(count)
            }
        }
        return 0
    }

    this.diagonalCheck = function(arr) {
        var count = 0
        for (i = 0; i < 12; i += 4) {
            count += arr[i]
        }
        if (this.count(count) !== 0) {
            return this.count(count)
        } else {
            count = 0
            for(i = 2; i < 8; i += 2) {
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
    this.checkBlock = function(block) {
        if (this.rowCheck(map[block]) !== 0) {
            return this.rowCheck(map[block])
        } else if (this.columnCheck(map[block]) !== 0) {
            return this.columnCheck(map[block])
        } else if (this.diagonalCheck(map[block]) !== 0) {
            return this.diagonalCheck(map[block])
        } else {
            return 0
        }
    }

    // returns a int value after checking entire chess map: status: 0 - not finished, 1 - tic win, 2 - tac win
    this.check = function() {

    }
    this.reset = function() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                map[i][j] = 0
            }
            blockStatus[i] = 0
        }
        activeBlock = -1
    }

    // call this to play a step, will call setItemStatus in this method and set other game state.
    this.play = function(block, item, status) {
        if (this.isBlockAvailable(block) === false) {
            console.log('Block is not available')
        } else if (this.isItemAvailable(block, item) === false) {
            console.log('Item is not available')
        } else {
            this.setItemStatus(block, item, status)
            console.log('Block ' + block + ' status is ' + status + ', next active Block is ' + item)
            activeBlock = this.getBlockStatus[item] === 0 ? item : -1
            this.updateStatus()
        }
    }



    // render chess map
    this.render = function() {

    }

}


var map = new Map()
map.reset()
map.play(0, 0, 4)
