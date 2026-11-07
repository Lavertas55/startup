function createCourseService(courseDao) {
    return {
        async addCourse(courseName, courseCode) {
            return await courseDao.addCourse(courseName, courseCode);
        },

        async getCourses() {
            return await courseDao.getCourses();
        },

        async getCourse(courseId) {
            return await courseDao.findCourse('id', courseId);
        },

        async registerStudent(courseCode, studentId) {
            return await courseDao.registerStudent(courseCode, studentId);
        }
    };
}

module.exports = { createCourseService };