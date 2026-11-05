function createAuthHandlers(authService, authCookieName) {
    return {
        async registerHandler(req, res) {
            const user = await authService.registerUser(
                req.body.userName,
                req.body.password
            );
        
            authService.setAuthCookie(res, user.token);
            res.send({ userName: user.userName });
        },

        async loginHandler(req, res) {
            const user = await authService.loginUser(
                req.body.userName,
                req.body.password
            );

            authService.setAuthCookie(res, user.token);
            res.send({ userName: user.email });
        },

        async logoutHandler(req, res) {
            await authService.logoutUser(req.body.token);

            res.clearCookie(authCookieName);
            res.status(204).end();
        }
    }
}

module.exports = { createAuthHandlers };