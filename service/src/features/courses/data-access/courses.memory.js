const { RecordConflictError } = require("../../../errors/record-conflict");

function createMemoryCourseDao(store) {
    return {
        async findCourse(field, value) {
            if (!value) return null;

            return store.courses.find((c) => c[field] === value);
        },

        async getCourses() {
            return store.courses;
        },

        async addCourse(className, classCode) {
            const course = {
                id: classCode,
                name: className,
                students: []
            }

            if (await this.findCourse('id', course.id)) {
                throw new RecordConflictError(
                    `Course ${course.id} already taken`
                );
            }

            store.courses.push(course);
            return course;
        }
    }
}

module.exports = { createMemoryCourseDao };