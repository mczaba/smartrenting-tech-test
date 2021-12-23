import express from 'express'
import trainingController from '../controllers/trainingController'
import auth from '../middlewares/isAuth'

const router = express.Router()

router.post('/add', auth.isAuth, trainingController.addTraining)
router.get('/all', auth.isAuth, trainingController.getAllTrainings)
router.delete('/:trainingId', auth.isAuth, auth.checkUser, trainingController.deleteTraining)
router.put('/:trainingId', auth.isAuth, auth.checkUser, trainingController.changeTrainingHours)

export default router