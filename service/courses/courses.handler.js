function createCourseHandlers(classService) {
    return {
        async addCourseHandler(req, res) {
            const course = await classService.addCourse(
                req.body.courseName,
                req.body.courseCode
            );

            res.send({ courseName: course.courseName, courseCode: course.courseCode });
        },

        async getCoursesHandler(req, res) {
            const courseList = await classService.getCourses();

            res.send({ courses: courseList });
        }
    };
}

module.exports = { createCourseHandlers };