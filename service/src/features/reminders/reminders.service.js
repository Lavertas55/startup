function createRemindersService(reminderDao) {
    return {
        async getReminder(reminderId) {
            return await reminderDao.findReminder('_id', reminderId);
        },

        async getRemindersByStudent(studentId) {
            return await reminderDao.getRemindersByStudent(studentId);
        },

        async getReminders() {
            return await reminderDao.getReminders();
        },

        async addReminder(studentId, timestamp, courseId) {
            return await reminderDao.addReminder(studentId, timestamp, courseId);
        },

        async removeReminder(reminderId) {
            return await reminderDao.removeReminder(reminderId);
        },

        async updateReminder(id, updates) {
            await reminderDao.updateReminder(id, updates);
        }
    };
}

module.exports = { createRemindersService };
