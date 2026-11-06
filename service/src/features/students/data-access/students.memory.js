const { RecordConflictError } = require("../../../errors/record-conflict");

function createMemoryStudentDao(store) {
    return {
        async findStudent(field, value) {
            if (!value) return null;

            return store.students.find((s) => s[field] === value);
        },

        async getStudentsByCourse(courseCode) {
            if (!courseCode) return null;

            return store.students.filter((s) => s.courses.includes[courseCode]);
        },

        async getAllStudents() {
            return store.students;
        },

        async addStudent(id, name, courses) {
            if (await this.findStudent('id', id)) {
                throw new RecordConflictError(`Student ${id} already taken`);
            }

            const student = {
                id: id,
                name: name,
                courses: courses
            };

            store.students.push(student);
            return student;
        }
    }
}

module.exports = { createMemoryStudentDao };