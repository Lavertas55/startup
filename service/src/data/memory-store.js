function createMemoryStore() {
    return {
        users: [],
        courses: [],
        students: [],
        contacts: [],
        reminders: [],
    };
}

module.exports = { createMemoryStore };