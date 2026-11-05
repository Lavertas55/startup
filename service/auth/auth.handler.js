function createAuthHandlers(authService) {
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
        }
    }
}


module.exports = { createAuthHandlers };