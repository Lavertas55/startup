const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { UnauthorizedError } = require('../errors/unauthorized');

function createAuthService(authDao) {
    return {
        async registerUser(userName, password) {
            const passwordHash = await bcrypt.hash(password, 10);

            await authDao.addUser(userName, passwordHash, uuid.v4());

            return user;
        },

        async loginUser(userName, password) {
            const user = await authDao.findUser('userName', userName);
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    user.token = uuid.v4();
                    return user;
                }
            }

            throw new UnauthorizedError('Unauthorized');
        },

        async logoutUser(authToken) {
            const user = await authDao.findUser('token', authToken);
            if (user) {
                delete user.token;
            }
        },

        async validateAuth(authToken) {
            const user = await authDao.findUser('token', authToken);
            if (!user) {
                throw new UnauthorizedError('Unauthorized');
            }
        }
    };
}

module.exports = { createAuthService };