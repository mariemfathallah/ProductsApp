import express from 'express'

import {
  forgotPassw,
  login,
  register,
  resetPassw,
} from '../Controllers/userController.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/forgotPassword', forgotPassw)
router.post('/resetPassword', resetPassw)
export default router
