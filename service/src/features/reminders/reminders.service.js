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
        },

        createReminderScheduler(reminderDao, courseDao) {

            return {
                async processDueReminders() {
                    const reminders = await reminderDao.getReminders()
                    const due = reminders.filter(
                        (r) => !r.delivered &&
                            r.attempts < 3 &&
                            Date.parse(r.timestamp) <= Date.now()
                    );

                    for (const reminder of due) {
                        reminder.attempts += 1;
                        try {
                            const course = await courseDao.findCourse('id', reminder.course);
                            if (!course?.webhookUrl) {
                                throw new Error('Course has no Discord webhook configured');
                            }

                            const response = await fetch(course.webhookUrl, {
                                method: 'POST',
                                redirect: 'error',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    content: `Reminder for student ${reminder.student} is due now.`
                                })
                            });
                            if (!response.ok) {
                                throw new Error(`Discord returned HTTP ${response.status}`);
                            }
                            
                            reminder.delivered = true;
                            reminder.deliveryError = null;
                        } catch (error) {
                            reminder.deliveryError = reminder.attempts >= 3 ? error.message : null;
                            console.error(`Discord reminder ${reminder._id} delivery failed:`, error.message);
                        }
                
                        const { _id, ...rest } = reminder;
                        await reminderDao.updateReminder(_id, rest);
                    }
                }
            }
        }
    };
}

module.exports = { createRemindersService };
