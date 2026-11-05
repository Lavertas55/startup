function createAuthHandlers(authService, authCookieName) {
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
            await authService.logoutUser(req.body.token);

            res.clearCookie(authCookieName);
            res.status(204).end();
        },
        setAuthCookie(res, authToken) {
            res.cookie(authCookieName, authToken, {
                maxAge: 1000 * 60 * 60 * 24 * 365,
                secure: true,
                httpOnly: true,
                sameSite: 'strict',
            });
        }
    }
}

module.exports = { createAuthHandlers };