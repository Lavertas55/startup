const uuid = require('uuid');

function createMemoryReminderDao(store) {
    return {
        async findReminder(field, value) {
            if (!value) return null;

            return store.reminders.find((reminder) => reminder[field] === value);
        },

        async getRemindersByStudent(studentId) {
            if (!studentId) return null;

            return store.reminders.filter((reminder) => reminder.studentId === studentId);
        },

        async addReminder(studentId, timestamp, courseId) {
            const reminder = {
                id: uuid.v7(),
                studentId,
                courseId,
                timestamp,
                delivered: false
            };

            store.reminders.push(reminder);
            return reminder;
        },

        async removeReminder(reminderId) {
            const reminderIndex = store.reminders.findIndex(
                (reminder) => reminder.id === reminderId
            );
            if (reminderIndex === -1) return null;

            return store.reminders.splice(reminderIndex, 1)[0];
        }
    };
}

module.exports = { createMemoryReminderDao };
