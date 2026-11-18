const { ObjectId } = require("mongodb");

function createMongoContactDao(db) {
    const contactCollection = db.collection("contact");

    return {
        async findContact(field, value) {
            if (field == "_id") value = new ObjectId(value);
            return await contactCollection.findOne({ [field]: value });
        },

        async getContactsByStudent(studentId) {
            return await contactCollection.find({ "student": studentId }).toArray();
        },

        async addContact(studentId, courseId, timestamp, instructor, method, success) {
            const contact = {
                student: studentId,
                course: courseId,
                timestamp: timestamp,
                instructor: instructor,
                method: method,
                success: success,
                notes: ""
            };

            await contactCollection.insertOne(contact);
        },

        async updateContact(contactId, updates) {
            await contactCollection.updateOne({ _id: new ObjectId(contactId) }, { $set: updates })
        }
    };
}

module.exports = { createMongoContactDao };