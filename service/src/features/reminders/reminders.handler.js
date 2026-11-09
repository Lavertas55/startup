function createReminderHandlers(reminderService) {
    return {
        async getReminderHandler(req, res) {
            const reminder = await reminderService.getReminder(req.params.id);

            res.send({
                id: reminder.id,
                studentId: reminder.studentId,
                courseId: reminder.courseId,
                timestamp: reminder.timestamp,
                delivered: reminder.delivered,
                deliveryError: reminder.deliveryError
            });
        },

        async getRemindersHandler(req, res) {
            const reminders = await reminderService.getRemindersByStudent(req.query.student);

            res.send({ reminders });
        },

        async addReminderHandler(req, res) {
            await reminderService.addReminder(
                req.body.studentId,
                req.body.timestamp,
                req.body.courseId
            );

            res.status(204).end();
        },

        async deleteReminderHandler(req, res) {
            await reminderService.removeReminder(req.params.id);

            res.status(204).end();
        }
    };
}

module.exports = { createReminderHandlers };
