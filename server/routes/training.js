import express from 'express'
import trainingController from '../controllers/trainingController'
import isAuth from '../middlewares/isAuth'

const router = express.Router()

router.post('/add', isAuth(false), trainingController.addTraining)

export default router