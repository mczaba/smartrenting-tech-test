import express from 'express'
import trainingController from '../controllers/trainingController'
import isAuth from '../middlewares/isAuth'

const router = express.Router()

router.post('/add', isAuth(false), trainingController.addTraining)
router.get('/all', isAuth(false), trainingController.getAllTrainings)
router.delete('/:userId/:trainingId', isAuth(true), trainingController.deleteTraining)
router.put('/:userId/:trainingId', isAuth(true), trainingController.changeTrainingHours)

export default router