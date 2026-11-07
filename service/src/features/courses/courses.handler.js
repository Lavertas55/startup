function createCourseHandlers(classService) {
    return {
        async addCourseHandler(req, res) {
            await classService.addCourse(
                req.body.courseName,
                req.body.courseCode
            );

            res.status(204).end();
        },

        async getCoursesHandler(req, res) {
            const courseList = await classService.getCourses();

            res.send({ courses: courseList });
        }
    };
}

module.exports = { createCourseHandlers };