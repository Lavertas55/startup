const { RecordConflictError } = require("../../errors/record-conflict");

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
                courseName: className,
                courseCode: classCode,
                students: []
            }

            if (await this.findCourse('courseCode', course.courseCode)) {
                throw new RecordConflictError(
                    `Course ${course.courseCode} already taken`
                );
            }

            store.courses.push(course);
            return course;
        }
    }
}

module.exports = { createMemoryCourseDao };