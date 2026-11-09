const { RecordConflictError } = require("../../../errors/record-conflict");
const { BadRequestError } = require("../../../errors/bad-request");

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

function createMemoryCourseDao(store) {
    return {
        async findCourse(field, value) {
            if (!value) return null;

            return store.courses.find((c) => c[field] === value);
        },

        async getCourses() {
            return store.courses;
        },

        async addCourse(className, classCode, webhookUrl) {
            const validatedWebhookUrl = validateWebhookUrl(webhookUrl);
            const course = {
                id: classCode,
                name: className,
                webhookUrl: validatedWebhookUrl,
                students: []
            }

            if (await this.findCourse('id', course.id)) {
                throw new RecordConflictError(
                    `Course ${course.id} already taken`
                );
            }

            store.courses.push(course);
        },

        async registerStudent(courseCode, studentId) {
            const course = await this.findCourse('id', courseCode);

            course.students.push(studentId);
        }
    }
}

module.exports = { createMemoryCourseDao };
