// const express = require('express');
const jwt = require('jsonwebtoken');

const verfyToken = (req, res, next) => {
    // mengambil token
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // verifikasi token
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decode;
        next();
    })
}

module.exports = verfyToken;