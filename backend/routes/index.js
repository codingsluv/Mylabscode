const express = require('express');
const router = express.Router();

const registerController = require('../controllers/RegisterController');
const loginController = require('../controllers/LoginController');
const userController = require('../controllers/UserController');
const { validateRegister, validateLogin } = require('../utils/validators/auth');
const verfyToken = require('../middlewares/auth');

// definisikan route
// * Register Route
router.post('/register', validateRegister, registerController.register)
router.post('/login', validateLogin, loginController.login)

// * Login Route
router.get('/admin/users', verfyToken, userController.findUser)
router.post('/admin/users', verfyToken, userController.createUser)
router.get('/admin/users/:id', verfyToken, userController.findUserById)
router.put('/admin/users/:id', verfyToken, userController.updateUser)
router.delete('/admin/users/:id', verfyToken, userController.deleteUser)

module.exports = router;