import {
	Router
} from 'express'

const router = Router()

/* GET home page. */
router.get('/', function (req, res) {
	res.render('index', {
		title: 'index'
	})
})
router.get('/game', function (req, res) {
	res.render('game', {
		title: 'game'
	})
})
router.get('/download', function (req, res) {
	res.render('download', {
		title: 'download'
	})
})
router.get('/about', function (req, res) {
	res.render('about', {
		title: 'about'
	})
})

export default router
