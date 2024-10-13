const { validationResult } = require('express-validator');
const prisma = require('../prisma/helper/client.js');
const bcrypt = require('bcryptjs');

// get user with token 
const findUser = async (req, res) => {
    try {
        // get query data di prisma | user
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
            },
            orderBy: {
                id: 'desc'
            }
        })

        res.status(200).send({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        })
    } catch {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

// create user
const createUser = async (req, res) => {
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
            }
        })

        res.status(201).send({
            success: true,
            message: "User created successfully",
            data: user,
        })
    } catch {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

const findUserById = async (req, res) => {

    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                username: true,
                email: true,
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).send({
            success: true,
            message: `User with id ${id} retrieved successfully`,
            data: user,
        })
    } catch {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array()
        })
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
        })
        res.status(200).send({
            success: true,
            message: "User updated successfully",
            data: user,
        })
    } catch {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(id),
            }
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).send({
            success: true,
            message: `User with id ${id} deleted successfully`,
        })
    } catch {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    findUser,
    createUser,
    findUserById,
    updateUser,
    deleteUser
};