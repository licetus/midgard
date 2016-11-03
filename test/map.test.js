import assert from 'assert'
import Map from '../public/javascripts/map.js'

describe('Map', () => {
	describe('reset', () => {
		it('should be correct initialized after reset map', () => {
			let map = new Map()
			for(let i = 0; i < 9; i++) {
				for(let j = 0; j < 9; j++) {
					map.getItemStatus(i, j, Map.tic)
				}
				map.setBlockStatus(i, Map.tic)
			}
			map.reset()
			assert.equal(map.getActiveBlock(), -1)
			for(let i = 0; i < 9; i++) {
				for(let j = 0; j < 9; j++) {
					assert.equal(map.getItemStatus(i, j), Map.empty)
				}
				assert.equal(map.getBlockStatus(i), Map.empty)
			}

		})
	})

	describe('setItemStatus', () => {
		it('should get Tic when item status set to Tic', () => {
			let map = new Map()
			map.setItemStatus(5, 5, Map.tic)
			assert.equal(map.getItemStatus(5, 5), Map.tic)
		})
	})

	describe('setBlockStatus', () => {
		it('should get Tic when block status set to Tic', () => {
			let map = new Map()
			map.setBlockStatus(5, Map.tic)
			assert.equal(map.getBlockStatus(5), Map.tic)
		})
	})

	describe('isItemAvailable', () => {
		it('should get return false when item is Tic or Tac', () => {
			let map = new Map()
			map.setItemStatus(5, 5, Map.tic)
			assert.equal(map.isItemAvailable(5, 5), false)
			map.setItemStatus(5, 5, Map.tac)
			assert.equal(map.isItemAvailable(5, 5), false)
		})

		it('should get return true when item is empty', () => {
			let map = new Map()
			map.setItemStatus(5, 5, Map.empty)
			assert.equal(map.isItemAvailable(5, 5), true)
		})
	})

	describe('play', () => {
		it('should return true when play a correct location', () => {
			let map = new Map()
			map.play(4, 2, Map.tic)
			assert.equal(map.getItemStatus(4, 2), Map.tac)
			assert.equal(map.play(2, 5, Map.tac), true)
		})

		it('should return false when put a Tic on a occupied location', () => {
			let map = new Map()
			map.play(3, 2, Map.tic)
			assert.equal(map.play(3, 2, Map.tac), false)
		})

		it('should return false when put Tic twice', () => {
			let map = new Map()
			map.play(3, 2, Map.tic)
			assert.equal(map.play(2, 7, Map.tic), false)
		})

		it('should return false when first put Tac', () => {
			let map = new Map()
			assert.equal(map.play(2, 7, Map.tac), false)
		})

		it('should return false when put Tac in an inactive block', () => {
			let map = new Map()
			map.play(3, 2, Map.tic)
			assert.equal(map.play(3, 7, Map.tac), false)
		})

		it('should return false when location is out of map', () => {
			let map = new Map()
			assert.equal(map.play(9, 1, Map.tac), false)
			assert.equal(map.play(-1, 1, Map.tac), false)
			assert.equal(map.play(2, 9, Map.tac), false)
			assert.equal(map.play(2, -1, Map.tac), false)
		})
	})

	describe('check', () => {
		it('should return NotFinished when game is not finished', () => {
			let map = new Map()
			assert.equal(map.check(), Map.notFinished)
		})

		it('should return Draw when draw', () => {
			let map = new Map()
			let arr = [Map.tic, Map.tic, Map.tac, Map.tac, Map.tac, Map.tic, Map.tic, Map.tac, Map.tic]
			for(let i = 0; i < 9; i++) {
				map.setBlockStatus(i, arr[i])
			}
			assert.equal(map.check(), Map.draw)
		})

		it('should return Tic when tic win', () => {
			let map = new Map()
			let arr = [Map.tic, Map.tic, Map.tic, Map.tac, Map.tac, Map.tic, Map.tic, Map.tac, Map.tic]
			for(let i = 0; i < 9; i++) {
				map.setBlockStatus(i, arr[i])
			}
			assert.equal(map.check(), Map.tic)
		})

		it('should return Tac when tac win', () => {
			let map = new Map()
			let arr = [Map.tac, Map.tac, Map.tac, Map.tic, Map.tic, Map.tac, Map.tac, Map.tic, Map.tac]
			for(let i = 0; i < 9; i++) {
				map.setBlockStatus(i, arr[i])
			}
			assert.equal(map.check(), Map.tac)
		})
	})


	describe('checkBlock', () => {
		it('should return Tac when 3 item in one row setted to Tac', () => {
			let map = new Map()
			map.setItemStatus(0, 0, Map.tac)
			map.setItemStatus(0, 1, Map.tac)
			map.setItemStatus(0, 2, Map.tac)
			assert.equal(map.checkBlock(0), Map.tac)
		})

		it('should return Tac when 3 item in one column setted to Tic', () => {
			let map = new Map()
			map.setItemStatus(0, 0, Map.tic)
			map.setItemStatus(0, 3, Map.tic)
			map.setItemStatus(0, 6, Map.tic)
			assert.equal(map.checkBlock(0), Map.tic)
		})

		it('should return Tac when 3 item in one diagonal setted to Tac', () => {
			let map = new Map()
			map.setItemStatus(0, 2, Map.tic)
			map.setItemStatus(0, 4, Map.tic)
			map.setItemStatus(0, 6, Map.tic)
			assert.equal(map.checkBlock(0), Map.tic)
		})

		it('should return Empty when 3 item in one diagonal setted to Tic and Tac', () => {
			let map = new Map()
			map.setItemStatus(0, 2, Map.tic)
			map.setItemStatus(0, 4, Map.tac)
			map.setItemStatus(0, 6, Map.tic)
			assert.equal(map.checkBlock(0), Map.empty)
		})

		it('should return Draw for a specific condition', () => {
			let map = new Map()
			let arr = [Map.tic, Map.tic, Map.tac, Map.tac, Map.tac, Map.tic, Map.tic, Map.tac, Map.tic]
			for(let i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			assert.equal(map.checkBlock(0), Map.draw)
		})

		it('should return Empty for a specific condition', () => {
			let map = new Map()
			let arr = [Map.tic, Map.tac, Map.tic, Map.tac, Map.tac, Map.tic, Map.tic, Map.tic, Map.empty]
			for(let i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			assert.equal(map.checkBlock(0), Map.empty)
		})
	})

	describe('getActiveBlock', () => {
		it('should return -1 after init', () => {
			let map = new Map()
			assert.equal(map.getActiveBlock(), -1)
		})

		it('should return 0 after play (0,0)', () => {
			let map = new Map()
			map.play(0, 0, Map.tac)
			assert.equal(map.getActiveBlock(), 0)
		})

		it('should return -1 after play (3,0) and block 0 is full', () => {
			let map = new Map()
			let arr = [Map.tic, Map.tic, Map.tac, Map.tac, Map.tac, Map.tic, Map.tic, Map.tac, Map.tic]
			for(let i = 0; i < 9; i++) {
				map.setItemStatus(0, i, arr[i])
			}
			map.play(3, 0, Map.tac)
			assert.equal(map.getActiveBlock(), -1)
		})
	})

})
