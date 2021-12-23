import express from 'express'
import statsController from '../controllers/statsController'
import auth from '../middlewares/isAuth'

const router = express.Router()

router.get('/average', auth.isAuth, statsController.getAverage)
router.get('/sum/:date', auth.isAuth, statsController.getSum)
router.get('/toptrainers', auth.isAuth, statsController.getTopTrainers)

export default router