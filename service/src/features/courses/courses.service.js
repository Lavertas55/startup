const { BadRequestError } = require("../../errors/bad-request");

function validateWebhookUrl(value) {
    if (!value || !value.trim()) return '';
    let parsed;
    try { parsed = new URL(value.trim()); } catch { throw new BadRequestError('Invalid Discord webhook URL'); }
    const validHost = parsed.hostname === 'discord.com' || parsed.hostname === 'discordapp.com';
    const validPath = /^\/api\/webhooks\/\d+\/[^/]+\/?$/.test(parsed.pathname);
    if (parsed.protocol !== 'https:' || !validHost || !validPath || parsed.username || parsed.password) {
        throw new BadRequestError('Invalid Discord webhook URL');
    }
    return parsed.toString();
}

function createCourseService(courseDao) {
    return {
        async addCourse(courseName, courseCode, webhookUrl) {
            const validatedWebhookUrl = validateWebhookUrl(webhookUrl);
            return await courseDao.addCourse(courseName, courseCode, validatedWebhookUrl);
        },

        async getCourses() {
            return await courseDao.getCourses();
        },

        async getCourse(courseId) {
            return await courseDao.findCourse('id', courseId);
        },

        async registerStudent(courseCode, studentId) {
            return await courseDao.registerStudent(courseCode, studentId);
        }
    };
}

module.exports = { createCourseService };
