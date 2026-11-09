function createRemindersService(reminderDao) {
    return {
        async getReminder(reminderId) {
            return await reminderDao.findReminder('id', reminderId);
        },

        async getRemindersByStudent(studentId) {
            return await reminderDao.getRemindersByStudent(studentId);
        },

        async addReminder(studentId, timestamp, courseId) {
            return await reminderDao.addReminder(studentId, timestamp, courseId);
        },

        async removeReminder(reminderId) {
            return await reminderDao.removeReminder(reminderId);
        }
    };
}

module.exports = { createRemindersService };
