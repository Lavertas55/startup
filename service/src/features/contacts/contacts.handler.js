const uuid62 = require("@digitalmaas/uuid-base62");

function createContactHandlers(contactService) {
    return {
        async getContactHandler(req, res) {
            const id = uuid62.decode(req.params.id);

            const contact = await contactService.getContact(id);

            res.send({
                _id: uuid62.encode(contact.id),
                course: contact.course,
                timestamp: contact.timestamp,
                instructor: contact.instructor,
                method: contact.method,
                success: contact.success
            });
        },

        async addContactHandler(req, res) {
            await contactService.addContact(
                req.body.course,
                req.body.timestamp,
                req.body.instructor,
                req.body.method,
                req.body.success
            );

            res.status(204).end();
        }
    };
}

module.exports = { createContactHandlers };