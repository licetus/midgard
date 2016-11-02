var assert = require('assert')
var Map = require('../public/javascripts/map.js')


describe('Map', function() {
	describe('reset', function() {
		it('should be correct initialized after reset map', function() {
			var map = new Map()
			map.reset()
			assert.equal(map.getActiveBlock(), -1)
			for(var i = 0; i < 9; i++) {
				for(var j = 0; j < 9; j++) {
					assert.equal(map.getItemStatus(i, j), 0)
				}
				assert.equal(map.getBlockStatus(i, j), 0)
			}

		})
	})

	describe('play', function() {
		it('should be set to Tac after play Tac in a location', function() {
			var map = new Map()
			map.reset()
			map.play(0, 0, map.tac)
			assert.equal(map.getItemStatus(0, 0), map.tac)
		})
	})

	describe('checkBlock', function() {
		it('should return Tac when 3 item in one row setted to Tac', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(0, 0, map.tac)
			map.setItemStatus(0, 1, map.tac)
			map.setItemStatus(0, 2, map.tac)
			assert.equal(map.checkBlock(0), map.tac)
		})

		it('should return Tac when 3 item in one column setted to Tic', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(0, 0, map.tic)
			map.setItemStatus(0, 3, map.tic)
			map.setItemStatus(0, 6, map.tic)
			assert.equal(map.checkBlock(0), map.tic)
		})

		it('should return Tac when 3 item in one diagonal setted to Tac', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(0, 2, map.tic)
			map.setItemStatus(0, 4, map.tic)
			map.setItemStatus(0, 6, map.tic)
			assert.equal(map.checkBlock(0), map.tic)
		})

		it('should return Empty when 3 item in one diagonal setted to Tic and Tac', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(0, 2, map.tic)
			map.setItemStatus(0, 4, map.tac)
			map.setItemStatus(0, 6, map.tic)
			assert.equal(map.checkBlock(0), map.empty)
		})

		it('should return Draw for a specific condition', function() {
			var map = new Map()
			var arr = [map.tic, map.tic, map.tac, map.tac, map.tac, map.tic, map.tic, map.tac, map.tic]
			map.reset()
			for(var i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			assert.equal(map.checkBlock(0), map.draw)
		})

		it('should return Empty for a specific condition', function() {
			var map = new Map()
			var arr = [map.tic, map.tac, map.tic, map.tac, map.tac, map.tic, map.tic, map.tic, map.empty]
			map.reset()
			for(var i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			assert.equal(map.checkBlock(0), map.empty)
		})
	})

	describe('getActiveBlock', function() {
		it('should return -1 after init', function() {
			var map = new Map()
			map.reset()
			assert.equal(map.getActiveBlock(), -1)
		})

		it('should return 0 after play (0,0)', function() {
			var map = new Map()
			map.reset()
			map.play(0, 0, map.tac)
			assert.equal(map.getActiveBlock(), 0)
		})

		it('should return -1 after play (3,0) and block 0 is full', function() {
			var map = new Map()
			var arr = [map.tic, map.tic, map.tac, map.tac, map.tac, map.tic, map.tic, map.tac, map.tic]
			map.reset()
			for(var i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			map.play(3, 0, map.tac)
			assert.equal(map.getActiveBlock(), -1)
		})
	})
})
