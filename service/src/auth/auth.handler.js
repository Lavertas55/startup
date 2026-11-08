const UnauthorizedError = require("../errors/unauthorized");

function createAuthHandlers(authService, authCookieName) {
    const authCookieOptions = {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    };

    return {
        async registerHandler(req, res) {
            const user = await authService.registerUser(
                req.body.userName,
                req.body.password
            );
        
            this.setAuthCookie(res, user.token);
            res.send({ userName: user.userName });
        },

        async loginHandler(req, res) {
            const user = await authService.loginUser(
                req.body.userName,
                req.body.password
            );

            this.setAuthCookie(res, user.token);
            res.send({ userName: user.userName });
        },

        async logoutHandler(req, res) {
            await authService.logoutUser(req.cookies[authCookieName]);

            res.clearCookie(authCookieName, authCookieOptions);
            res.status(204).end();
        },

        verifyAuth: async (req, res, next) => {
            try {
                await authService.validateAuth(req.cookies[authCookieName]);
                next();
            } catch (err) {
                if (err instanceof UnauthorizedError) {
                    res.clearCookie(authCookieName, authCookieOptions);
                }
                next(err);
            }
        },

        validateAuthHandler(req, res) {
            res.status(204).end();
        },

        setAuthCookie(res, authToken) {
            res.cookie(authCookieName, authToken, {
                maxAge: 1000 * 60 * 60 * 24 * 365,
                ...authCookieOptions,
            });
        }
    }
}

module.exports = { createAuthHandlers };
