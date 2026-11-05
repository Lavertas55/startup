function createMemoryStore() {
    return {
        users: new Map(),
        nextId: { users: 1 },
    };
}

module.exports = { createMemoryStore };