const { createAuthHandlers } = require("./auth/auth.handler");
const { createAuthService } = require("./auth/auth.service");
const { createMemoryAuthDao } = require("./auth/data-access/auth.memory");

const { createCourseHandlers } = require("./courses/courses.handler");
const { createCourseService } = require("./courses/courses.service");
const { createMemoryCourseDao } = require("./courses/data-access/courses.memory");

const { createMemoryStudentDao } = require("./students/data-access/students.memory");

const { createStudentHandlers } = require("./students/students.handler");
const { createStudentService } = require("./students/students.service");
const { createMemoryStore } = require("./data/memory-store");

const { RecordConflictError } = require("./errors/record-conflict");
const { UnauthorizedError } = require("./errors/unauthorized");

const authCookieName = 'token';

function buildContainer() {
    const memoryStore = createMemoryStore();

    const authDao = createMemoryAuthDao(memoryStore);
    const courseDao = createMemoryCourseDao(memoryStore);
    const studentDao = createMemoryStudentDao(memoryStore);

    const authService = createAuthService(authDao, authCookieName);
    const courseService = createCourseService(courseDao);
    const studentService = createStudentService(studentDao);

    const authHandlers = createAuthHandlers(authService, authCookieName);
    const courseHandlers = createCourseHandlers(courseService);
    const studentHandlers = createStudentHandlers(studentService);

    return { authHandlers, courseHandlers, studentHandlers };
}

function errorHandler() {
    return (err, req, res, next) => {
        if (err instanceof RecordConflictError) {
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