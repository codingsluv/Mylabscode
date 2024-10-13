const { body } = require('express-validator');
const prisma = require('../../prisma/helper/client');

// validasi untuk register
const validateRegister = [
    body('username').notEmpty().withMessage('username tidak boleh kosong'),
    body('email').notEmpty().withMessage('email tidak boleh kosong')
    .isEmail().withMessage('email invalid')
    .custom(async (value) => {
        if (!value) {
            throw new Error('email tidak boleh kosong');
        }
        const user = await prisma.user.findUnique({ where: { email: value } });
        if(user) {
            throw new Error('email sudah terdaftar');
        }
        return true;
    }),
    body('password').isLength({ min: 6 }).withMessage('password minimal 6 karakter')
]

const validateLogin = [
    body('email').notEmpty().withMessage('email tidak boleh kosong'),
    body('password').isLength({ min: 6 }).withMessage('password minimal 6 karakter')
]

module.exports = {
    validateRegister,
    validateLogin
}