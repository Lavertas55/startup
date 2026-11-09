function createContactHandlers(contactService) {
    return {
        async getContactHandler(req, res) {
            const contact = await contactService.getContact(req.params.id);
            if (!contact) res.status(404).send({ msg: 'Contact not found' });

            res.send({
                id: contact.id,
                studentId: contact.student,
                course: contact.course,
                timestamp: contact.timestamp,
                instructor: contact.instructor,
                method: contact.method,
                success: contact.success,
                notes: contact.notes || ''
            });
        },

        async getContactsHandlers(req, res) {
            const studentId = req.query.student;

            const contacts = await contactService.getContactsByStudent(studentId);

            res.send({ contacts });
        },

        async addContactHandler(req, res) {
            await contactService.addContact(
                req.body.student,
                req.body.course,
                req.body.timestamp,
                req.body.instructor,
                req.body.method,
                req.body.success
            );

            res.status(204).end();
        },

        async updateContactHandler(req, res) {
            const { timestamp, instructor, method, success, notes } = req.body;
            const contact = await contactService.updateContact(req.params.id, { timestamp, instructor, method, success, notes });
            if (!contact) return res.status(404).send({ msg: 'Contact not found' });
            res.status(204).end();
        }
    };
}

module.exports = { createContactHandlers };
