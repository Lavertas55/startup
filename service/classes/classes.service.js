function createClassService(classDao) {
    return {
        async addClass(className, classCode) {
            return await classDao.addClass(className, classCode);
        },

        async getClasses() {
            return await classDao.getClasses();
        }
    };
}