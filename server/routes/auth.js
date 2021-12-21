import express from 'express'
import authController from '../controllers/authController'

const router = express.Router()

router.post('/login', authController.logIn)

export default router