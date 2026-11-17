const { RecordConflictError } = require("../../../errors/record-conflict");

function createMongoCourseDao(db) {
    const courseCollection = db.collection("course");

    return {
        async findCourse(field, value) {
            return courseCollection.findOne({ [field]: value });
        },
        
        async getCourses() {
            return courseCollection.find({}).toArray();
        },

        async addCourse(className, classCode, webhookUrl) {
            const course = {
                id: classCode,
                name: className,
                webhookUrl: webhookUrl,
                students: []
            }

            if (await this.findCourse('id', course.id)) {
                throw new RecordConflictError(
                    `Course ${course.id} already taken`
                );
            }

            courseCollection.insertOne(course);
        },

        async registerStudent(courseCode, studentId) {
            await courseCollection.updateOne({ id: courseCode }, { $addToSet: { students: studentId }});
        }
    }
}

module.exports = { createMongoCourseDao };