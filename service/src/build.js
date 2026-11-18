const { getDatabaseConnection } = require("./data/dbConnection");

const { createAuthHandlers } = require("./auth/auth.handler");
const { createAuthService } = require("./auth/auth.service");
const { createMongoAuthDao } = require("./auth/data-access/auth.mongo");

const { createCourseHandlers } = require("./features/courses/courses.handler");
const { createCourseService } = require("./features/courses/courses.service");
const { createMongoCourseDao } = require("./features/courses/data-access/courses.mongo");

const { createStudentHandlers } = require("./features/students/students.handler");
const { createStudentService } = require("./features/students/students.service");
const { createMongoStudentDao } = require("./features/students/data-access/students.mongo");

const { createContactHandlers } = require("./features/contacts/contacts.handler");
const { createContactsService } = require("./features/contacts/contacts.service");
const { createMongoContactDao } = require("./features/contacts/data-access/contacts.mongo");

const { createReminderHandlers } = require("./features/reminders/reminders.handler");
const { createRemindersService } = require("./features/reminders/reminders.service");
const { createMongoReminderDao } = require("./features/reminders/data-access/reminders.mongo");

const authCookieName = 'token';

function buildContainer() {
    const dbConnection = getDatabaseConnection();

    const authDao = createMongoAuthDao(dbConnection);
    const courseDao = createMongoCourseDao(dbConnection);
    const studentDao = createMongoStudentDao(dbConnection);
    const contactDao = createMongoContactDao(dbConnection);
    const reminderDao = createMongoReminderDao(dbConnection);

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

    const reminderScheduler = reminderService.createReminderScheduler(reminderDao, courseDao);
    const reminderTimer = setInterval(
        reminderScheduler.processDueReminders,
        15000
    );
    reminderTimer.unref();

    return { 
        authHandlers,
        courseHandlers,
        studentHandlers,
        contactHandlers,
        reminderHandlers
    };
}

module.exports = { buildContainer };