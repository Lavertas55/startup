const { createAuthHandlers } = require("./auth/auth.handler");
const { createAuthService } = require("./auth/auth.service");
const { createMemoryAuthDao } = require("./auth/data-access/auth.memory");

const { createClassHandlers } = require("./classes/classes.handler");
const { createClassService } = require("./classes/classes.service");
const { createMemoryClassDao } = require("./classes/data-access/classes.memory");

const { createMemoryStore } = require("./data/memory-store");

const { UserTakenError } = require("./errors/user-taken");
const { UnauthorizedError } = require("./errors/unauthorized");

const authCookieName = 'token';

function buildContainer() {
    const memoryStore = createMemoryStore();

    const authDao = createMemoryAuthDao(memoryStore);
    const classDao = createMemoryClassDao(memoryStore);

    const authService = createAuthService(authDao, authCookieName);
    const classService = createClassService(classDao);

    const authHandlers = createAuthHandlers(authService, authCookieName);
    const classHandlers = createClassHandlers(classService);

    return { authHandlers, classHandlers };
}

function errorHandler() {
    return (err, req, res, next) => {
        if (err instanceof UserTakenError) {
            res.status(409);
        } else if (err instanceof UnauthorizedError) {
            res.status(401);
        } else {
            res.status(500);
        }
        res.send({ type: err.name, msg: err.message });
    };
}

module.exports = { buildContainer, errorHandler };