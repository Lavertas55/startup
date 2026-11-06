function createMemoryStore() {
    return {
        users: [],
        courses: [],
        students: [],
    };
}

module.exports = { createMemoryStore };