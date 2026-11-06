function createMemoryCourseDao(store) {
    return {
        async findCourse(field, value) {
            if (!value) return null;

            return store.users.find((u) => u[field] === value);
        },

        async getCourse() {
            return store.users.courses;
        },

        async addClass(className, classCode) {
            const course = {
                courseName: className,
                courseCode: classCode
            }

            if (await this.findCourse('courseCode', course.courseCode)) {
                throw new ClassTakenError(
                    `Course ${course.courseCode} already taken`
                );
            }

            store.classes.push(course);
            return course;
        }
    }
}

module.exports = { createMemoryCourseDao };