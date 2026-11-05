const { createAuthHandlers } = require("./auth/auth.handler");
const { createMemoryAuthDao } = require("./auth/data-access/auth.memory");
const { createMemoryStore } = require("./data/memory-store");
const { UserTakenError } = require("./errors/user-taken");

function buildContainer() {
    const memoryStore = createMemoryStore();

    const authDao = createMemoryAuthDao(memoryStore);

    const authService = createAuthService(authDao);

    const authHandlers = createAuthHandlers(authService);

    return { authHandlers };
}

function errorHandler(err, req, res, next) {
    if (err instanceof UserTakenError) {
        res.status(409);
    } else {
        res.status(500);
    }
    res.send({ msg: `${err.message}`});
}

module.exports = { buildContainer, errorHandler };