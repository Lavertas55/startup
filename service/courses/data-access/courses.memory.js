const { ClassTakenError } = require("../../errors/class-taken");

function createMemoryCourseDao(store) {
    return {
        async findCourse(field, value) {
            if (!value) return null;

            return store.courses.find((u) => u[field] === value);
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
                throw new ClassTakenError(
                    `Course ${course.courseCode} already taken`
                );
            }

            store.courses.push(course);
            return course;
        }
    }
}

module.exports = { createMemoryCourseDao };