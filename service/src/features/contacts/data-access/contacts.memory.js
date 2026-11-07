const uuid = require('uuid');

function createMemoryContactDao(store) {
    return {
        async findContact(field, value) {
            if (!value) return null;

            return store.contacts.find((c) => c[field] === value);
        },

        async getAllContactsById(ids) {
            const contacts = []
            for (id of ids) {
                contacts.put(await this.findContact('id', id));
            }

            return contacts;
        },

        async addContact(courseId, timestamp, instructor, method, success) {
            const contact = {
                _id: uuid.v7(),
                course: courseId,
                timestamp: timestamp,
                instructor: instructor,
                method: method,
                success: success
            };

            store.contacts.push(contact);
        }
    };
}

module.exports = { createMemoryContactDao };