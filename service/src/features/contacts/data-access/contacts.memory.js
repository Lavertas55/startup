function createMemoryContactDao(store) {
    return {
        async findContact(field, value) {
            if (!value) return null;

            return store.contacts.find((c) => c[field] === value);
        }
    };
}