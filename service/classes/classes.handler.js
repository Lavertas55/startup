function createClassHandlers(classService) {
    return {
        async addClassHandler(req, res) {
            const classRecord = await classService.addClass(
                req.body.className,
                req.body.classCode
            );

            res.send({ className: classRecord.className, classCode: classRecord.classCode });
        },

        async getClassesHandler(req, res) {
            const classList = await classService.getClasses();

            req.send({ classes: classList });
        }
    };
}

module.exports = { createClassHandlers };