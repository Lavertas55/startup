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
        },

        async getCourseHandler(req, res) {
            const course = await classService.getCourse(req.params.id);

            res.send({
                id: course.id,
                name: course.name,
                students: course.students
            });
        }
    };
}

module.exports = { createCourseHandlers };