function createContactService(contactsDao) {
    return {
        async getContact(contactId) {
            return await contactsDao.findContact('id', contactId);
        },

        async getContactsByStudent(studentId) {
            return await contactsDao.getContactsByStudent(studentId);
        },

        async addContact(studentId, courseId, timestamp, instructor, method, success) {
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