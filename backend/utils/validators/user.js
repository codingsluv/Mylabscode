const { body } = require('express-validator');
const prisma = require('../../prisma/helper/client');

const validateUser = [
    body('name').notEmpty().withMessage('nama tidak boleh kosong'),
    body('email').notEmpty().withMessage('email tidak boleh kosong')
    .isEmail().withMessage('email invalid')
    .custom(async (value, { req }) => {
        if (!value) {
            throw new Error('email tidak boleh kosong');
        }
        const user = await prisma.user.findUnique({ where: { email: value } });
        if(user && user.id !== Number(req.params.id)) {
            throw new Error('email sudah terdaftar');
        }
        return true;
    }),
    body('password').isLength({ min: 6 }).withMessage('password minimal 6 karakter')
]

module.exports = { 
    validateUser, 
}