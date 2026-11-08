const uuid = require('uuid');

function createMemoryContactDao(store) {
    return {
        async findContact(field, value) {
            if (!value) return null;

            return store.contacts.find((c) => c[field] === value);
        },

        async getContactsByStudent(studentId) {
            if (!studentId) return null;

            return store.contacts.filter((c) => c['student'] === studentId);
        },

        async addContact(studentId, courseId, timestamp, instructor, method, success) {
            const contact = {
                student: studentId,
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