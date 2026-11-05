const express = require('express');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const authRouter = express.Router();
const pathPrefix = '/auth';
const authCookieName = 'token';

function createAuthService(authDao) {
    return {
        async registerUser(userName, password) {
            const passwordHash = await bcrypt.hash(password, 10);

            const user = {
                userName: userName,
                password: passwordHash,
                token: uuid.v4(),
            };

            authDao.addUser(user);

            return user;
        },

        async loginUser(userName, password) {
            const user = authDao.findUser('userName', userName);
            if (user) {
                if (await bcrypt.compare(password, user.password)) {
                    user.token = uuid.v4();
                    return user;
                }
            }

            throw new UnauthorizedError('Unauthorized');
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