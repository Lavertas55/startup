function createStudentService(studentDao) {
    return {
        async addStudent(id, name, classes) {
            if (!(classes instanceof Array)) {
                classes = [classes];
            }

            return await studentDao.addStudent(id, name, classes);
        },

        async getStudent(field, value) {
            return await studentDao.findStudent(field, value);
        },

        async getStudentsByCourse(courseCode) {
            return await studentDao.getStudentsByCourse(courseCode);
        },

        async getAllStudents() {
            return await studentDao.getAllStudents();
        }
    };
}

module.exports = { createStudentService };