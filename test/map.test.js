import assert from 'assert'
import Map from '../public/javascripts/map.js'

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

	describe('setItemStatus', function() {
		it('should get Tic when item status set to Tic', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(5, 5, Map.tic)
			assert.equal(map.getItemStatus(5, 5), Map.tic)
		})
	})

	describe('setBlockStatus', function() {
		it('should get Tic when block status set to Tic', function() {
			var map = new Map()
			map.reset()
			map.setBlockStatus(5, Map.tic)
			assert.equal(map.getBlockStatus(5), Map.tic)
		})
	})

	describe('play', function() {
		it('should be set to Tac after play Tac in a location', function() {
			var map = new Map()
			map.reset()
			map.play(0, 0, Map.tac)
			assert.equal(map.getItemStatus(0, 0), Map.tac)
		})
	})

	describe('checkBlock', function() {
		it('should return Tac when 3 item in one row setted to Tac', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(0, 0, Map.tac)
			map.setItemStatus(0, 1, Map.tac)
			map.setItemStatus(0, 2, Map.tac)
			assert.equal(map.checkBlock(0), Map.tac)
		})

		it('should return Tac when 3 item in one column setted to Tic', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(0, 0, Map.tic)
			map.setItemStatus(0, 3, Map.tic)
			map.setItemStatus(0, 6, Map.tic)
			assert.equal(map.checkBlock(0), Map.tic)
		})

		it('should return Tac when 3 item in one diagonal setted to Tac', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(0, 2, Map.tic)
			map.setItemStatus(0, 4, Map.tic)
			map.setItemStatus(0, 6, Map.tic)
			assert.equal(map.checkBlock(0), Map.tic)
		})

		it('should return Empty when 3 item in one diagonal setted to Tic and Tac', function() {
			var map = new Map()
			map.reset()
			map.setItemStatus(0, 2, Map.tic)
			map.setItemStatus(0, 4, Map.tac)
			map.setItemStatus(0, 6, Map.tic)
			assert.equal(map.checkBlock(0), Map.empty)
		})

		it('should return Draw for a specific condition', function() {
			var map = new Map()
			var arr = [Map.tic, Map.tic, Map.tac, Map.tac, Map.tac, Map.tic, Map.tic, Map.tac, Map.tic]
			map.reset()
			for(var i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			assert.equal(map.checkBlock(0), Map.draw)
		})

		it('should return Empty for a specific condition', function() {
			var map = new Map()
			var arr = [Map.tic, Map.tac, Map.tic, Map.tac, Map.tac, Map.tic, Map.tic, Map.tic, Map.empty]
			map.reset()
			for(var i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			assert.equal(map.checkBlock(0), Map.empty)
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
			map.play(0, 0, Map.tac)
			assert.equal(map.getActiveBlock(), 0)
		})

		it('should return -1 after play (3,0) and block 0 is full', function() {
			var map = new Map()
			var arr = [Map.tic, Map.tic, Map.tac, Map.tac, Map.tac, Map.tic, Map.tic, Map.tac, Map.tic]
			map.reset()
			for(var i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			map.setBlockStatus(0, Map.draw)
			map.play(3, 0, Map.tac)
			assert.equal(map.getActiveBlock(), -1)
		})
	})

})
