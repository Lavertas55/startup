function createMemoryClassDao(store) {
    return {
        async findClass(field, value) {
            if (!value) return null;

            return store.users.find((u) => u[field] === value);
        },

        async getClasses() {
            return store.users.classes;
        },

        async addClass(className, classCode) {
            const classRecord = {
                className: className,
                classCode: classCode
            }

            if (await this.findClass('classCode', classRecord.classCode)) {
                throw new ClassTakenError(
                    `Class ${classRecord.classCode} already taken`
                );
            }

            store.classes.push(classRecord);
            return classRecord;
        }
    }
}

module.exports = { createMemoryClassDao };