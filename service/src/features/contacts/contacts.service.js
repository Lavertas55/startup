function createContactService(contactsDao) {
    return {
        async getContact(contactId) {
            return await contactsDao.findContact('id', contactId);
        },

        async getContactsById(contactIds) {
            return await contactsDao.getContactsById(contactIds);
        },

        async addContact(courseId, timestamp, instructor, method, success) {
            await contactsDao.addContact(
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