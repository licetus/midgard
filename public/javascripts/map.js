var Map = function() {
    var map = new Array(9)
    for (i = 0; i < 9; i++) {
        map[i] = new Array(9)
    }
    var blockStatus = new Array(9)
    var activeBlock = -1

    //status define
    this.activeAll = -1
    this.empty = 0
    this.tic = 1
    this.tac = 4
    this.draw = 16
    // return status of given location(i, j) | status: 0 - empty, 1 - tic, 4 -
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
            return this.tic
        } else if (count === 12) {
            return this.tac
        } else {
            return this.empty
        }
    }

    this.rowCheck = function(arr) {
        for (var i = 0; i < 9; i += 3) {
            var count = 0
            for (var j = 0; j < 3; j++) {
                count += arr[i + j]
            }
            if(var thisCount = this.count(count) !== this.empty) {
                return thisCount
            }
        }
        return this.empty
    }

    this.columnCheck = function(arr) {
        for (var i = 0; i < 3; i++) {
            var count = 0
            for(var j = 0; j < 9; j += 3) {
                count += arr[i + j]
            }
            if(var thisCount = this.count(count) !== this.empty) {
                return thisCount
            }
        }
        return this.empty
    }

    this.diagonalCheck = function(arr) {
        var count = 0
        for (i = 0; i < 12; i += 4) {
            count += arr[i]
        }
        if (var thisCount = this.count(count) !== this.empty) {
            return thisCount
        } else {
            count = 0
            for(i = 2; i < 8; i += 2) {
                count += arr[i]
            }
            if (var thisCount = this.count(count) !== this.empty) {
                return thisCount
            } else {
                return this.empty
            }
        }
    }

    // returns a int value after checking block i: status: 0 - not finished, 1 - tic win, 2 - tac win
    this.checkBlock = function(block) {
        if (var thisRowCheck = this.rowCheck(map[block]) !== this.empty) {
            return thisRowCheck
        } else if (var thisColumnCheck = this.columnCheck(map[block]) !== this.empty) {
            return thisColumnCheck
        } else if (var thisDiagonalCheck = this.diagonalCheck(map[block]) !== this.empty) {
            return thisDiagonalCheck
        } else {
            return this.empty
        }
    }

    // returns a int value after checking entire chess map: status: 0 - not finished, 1 - tic win, 2 - tac win
    this.check = function() {

    }
    this.reset = function() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                map[i][j] = this.empty
            }
            blockStatus[i] = this.empty
        }
        activeBlock = this.activeAll
    }

    // call this to play a step, will call setItemStatus in this method and set other game state.
    this.play = function(block, item, status) {
        if (this.isBlockAvailable(block) === false) {
            console.log('Block ' + block + ' is not available')
        } else if (activeBlock !== this.activeAll && activeBlock !== block) {
            console.log('Block ' + block + '  is not active')
        } else if (this.isItemAvailable(block, item) === false) {
            console.log('Item ' + item + '  is not available')
        } else {
            this.setItemStatus(block, item, status)
            console.log('Block ' + block + ' status is ' + status + ', next active Block is ' + item)
            if (this.checkBlock(block) !== this.empty) {
                this.setBlockStatus(block, this.checkBlock(block))
            }
            activeBlock = this.getBlockStatus[item] === this.empty ? item : this.activeAll
            this.updateStatus()
        }
    }

    // render chess map
    this.render = function() {

    }

}

var module = module || {}
if (module) { module.exports = Map }
