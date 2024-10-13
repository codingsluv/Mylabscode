const { validationResult } = require('express-validator');
const prisma = require('../prisma/helper/client.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        })
    }

    try {

        //find user berdasarkan prisma
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
            },
        });

        //user not found
        if (!user)
            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        //compare password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        //password incorrect
        if (!validPassword)
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });

        //generate token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Destructure to remove password from user object
        const { ...userWithoutPassword } = user;

        //return response
        res.status(200).send({
            success: true,
            message: "Login successfully",
            data: {
                user: userWithoutPassword,
                token: token,
            },
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

module.exports = {
    login
};