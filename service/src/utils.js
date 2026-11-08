const { createAuthHandlers } = require("./auth/auth.handler");
const { createAuthService } = require("./auth/auth.service");
const { createMemoryAuthDao } = require("./auth/data-access/auth.memory");

const { createCourseHandlers } = require("./features/courses/courses.handler");
const { createCourseService } = require("./features/courses/courses.service");
const { createMemoryCourseDao } = require("./features/courses/data-access/courses.memory");

const { createMemoryStudentDao } = require("./features/students/data-access/students.memory");

const { createStudentHandlers } = require("./features/students/students.handler");
const { createStudentService } = require("./features/students/students.service");
const { createMemoryStore } = require("./data/memory-store");

const { createContactHandlers } = require("./features/contacts/contacts.handler");
const { createContactsService } = require("./features/contacts/contacts.service");
const { createMemoryContactDao } = require("./features/contacts/data-access/contacts.memory");

const { createReminderHandlers } = require("./features/reminders/reminders.handler");
const { createRemindersService } = require("./features/reminders/reminders.service");
const { createMemoryReminderDao } = require("./features/reminders/data-access/reminders.memory");

const { RecordConflictError } = require("./errors/record-conflict");
const { UnauthorizedError } = require("./errors/unauthorized");

const authCookieName = 'token';

function buildContainer() {
    const memoryStore = createMemoryStore();

    const authDao = createMemoryAuthDao(memoryStore);
    const courseDao = createMemoryCourseDao(memoryStore);
    const studentDao = createMemoryStudentDao(memoryStore);
    const contactDao = createMemoryContactDao(memoryStore);
    const reminderDao = createMemoryReminderDao(memoryStore);

    const authService = createAuthService(authDao, authCookieName);
    const courseService = createCourseService(courseDao);
    const studentService = createStudentService(studentDao);
    const contactService = createContactsService(contactDao);
    const reminderService = createRemindersService(reminderDao);

    const authHandlers = createAuthHandlers(authService, authCookieName);
    const courseHandlers = createCourseHandlers(courseService);
    const studentHandlers = createStudentHandlers(studentService, courseService);
    const contactHandlers = createContactHandlers(contactService);
    const reminderHandlers = createReminderHandlers(reminderService);

    return { 
        authHandlers,
        courseHandlers,
        studentHandlers,
        contactHandlers,
        reminderHandlers
    };
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