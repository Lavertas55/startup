const { RecordConflictError } = require("../../../errors/record-conflict");

function createMongoStudentDao(db) {
    const studentCollection = db.collection("student");

    return {
        async findStudent(field, value) {
            return await studentCollection.findOne({ [field]: value });
        },

        async getStudentsByCourse(courseCode) {
            return await studentCollection.find({ "courses": courseCode }).toArray();
        },

        async getAllStudents() {
            return await studentCollection.find({}).toArray();
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

            await studentCollection.insertOne(student);
            return student;
        }
    }
}

module.exports = { createMongoStudentDao };