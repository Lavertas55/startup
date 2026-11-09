const { BadRequestError } = require('../../errors/bad-request');

function createContactService(contactsDao) {
    return {
        async getContact(contactId) {
            return await contactsDao.findContact('id', contactId);
        },

        async getContactsByStudent(studentId) {
            return await contactsDao.getContactsByStudent(studentId);
        },

        async addContact(studentId, courseId, timestamp, instructor, method, success) {
            const requiredFields = { studentId, courseId, timestamp, instructor, method };
            const missingField = Object.entries(requiredFields).find(([, value]) =>
                typeof value !== 'string' || value.trim() === ''
            );
            if (missingField) {
                throw new BadRequestError(`Contact ${missingField[0]} is required`);
            }

            await contactsDao.addContact(
                studentId,
                courseId,
                timestamp,
                instructor,
                method,
                success
            );
        }
    };
}

module.exports = { createContactsService: createContactService };
