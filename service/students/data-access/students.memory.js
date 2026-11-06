const { RecordConflictError } = require("../../errors/record-conflict");

function createMemoryStudentDao(store) {
    return {
        async findStudent(field, value) {
            if (!value) return null;

            return store.students.find((s) => s[field] === value);
        },

        async getStudentsByCourse(courseCode) {
            if (!value) return null;

            return store.students.filter((s) => s.courses.includes[courseCode]);
        },

        async addStudent(id, name, courses) {
            if (this.findStudent('name', name)) {
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