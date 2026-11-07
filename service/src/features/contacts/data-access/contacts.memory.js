function createMemoryContactDao(store) {
    return {
        async findContact(field, value) {
            if (!value) return null;

            return store.contacts.find((c) => c[field] === value);
        },

        async addContact(courseId, timestamp, instructor, method, success) {
            const contact = {
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