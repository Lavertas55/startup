const { ObjectId } = require("mongodb");

function createMongoReminderDao(db) {
    const reminderCollection = db.collection("reminder");

    return {
        async findReminder(field, value) {
            if (field == "_id") value = new ObjectId(value);
            return await reminderCollection.findOne({ [field]: value });
        },

        async getRemindersByStudent(studentId) {
            return await reminderCollection.find({ "student": studentId }).toArray();
        },

        async getReminders() {
            return await reminderCollection.find({}).toArray();
        },

        async addReminder(studentId, timestamp, courseId) {
            const reminder = {
                student: studentId,
                course: courseId,
                timestamp: timestamp,
                delivered: false,
                deliveryError: null,
                attempts: 0
            };

            await reminderCollection.insertOne(reminder);
            return reminder;
        },

        async removeReminder(reminderId) {
            await reminderCollection.deleteOne({ "_id": new ObjectId(reminderId) });
        },

        async updateReminder(id, updates) {
            await reminderCollection.updateOne({ "_id": new ObjectId(id) }, { $set: updates });
        }
    };
}

module.exports = { createMongoReminderDao };