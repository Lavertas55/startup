function createMemoryStore() {
    return {
        users: [],
        courses: [],
        students: [],
        contacts: [],
    };
}

module.exports = { createMemoryStore };