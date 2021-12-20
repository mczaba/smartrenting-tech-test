import express from 'express'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/login', authController.logIn)
router.get('/populate', authController.populateUsers)

export default router