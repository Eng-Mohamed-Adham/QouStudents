const express = require('express')
// const loginLimiter = require('../middlewares/loginLimiter')
const router = express.Router()
const authController = require('../controllers/authController')
const verifyJWT = require('../middlewares/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .post(authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)


module.exports = router