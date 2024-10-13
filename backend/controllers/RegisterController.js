// const express = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const prisma = require('../prisma/helper/client.js');

const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        })
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    try {
        // insert data user
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword,
            },
        })
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            data: user,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

module.exports = {
    register
};