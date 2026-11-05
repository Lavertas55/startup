const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const authRouter = express.Router();
const pathPrefix = '/auth';

function createAuthService(authDao, authCookieName) {
    return {
        async registerUser(userName, password) {
            const passwordHash = await bcrypt.hash(password, 10);

            const user = {
                userName: userName,
                password: passwordHash,
                token: uuid.v4(),
            };

            await authDao.addUser(user);

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

        setAuthCookie(res, authToken) {
            res.cookie(authCookieName, authToken, {
                maxAge: 1000 * 60 * 60 * 24 * 365,
                secure: true,
                httpOnly: true,
                sameSite: 'strict',
            });
        },
    };
}

authRouter.post(`${pathPrefix}/register`, async (req, res) => {
    if (await findUser('userName', req.body.userName)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.userName, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ userName: user.userName });
    }
});

module.exports = { createAuthService };