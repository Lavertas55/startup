function createCourseService(courseDao) {
    return {
        async addCourse(courseName, courseCode) {
            return await courseDao.addCourses(courseName, courseCode);
        },

        async getCourses() {
            return await courseDao.getCourses();
        }
    };
}

module.exports = { createCourseService };