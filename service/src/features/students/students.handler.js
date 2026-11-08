function createStudentHandlers(studentService, courseService) {
    return {
        async addStudentHandler(req, res) {
            const student = await studentService.addStudent(
                req.body.id,
                req.body.name,
                req.body.classes
            );

            if (req.body.classes.length !== 0) {
                for (course of req.body.classes) {
                    await courseService.registerStudent(course, student.id);
                }
            }

            res.status(204).end();
        },

        async getStudentHandler(req, res) {
            const student = await studentService.getStudent('id', req.params.id);

            res.send({
                id: student.id,
                name: student.name,
                courses: student.courses
            });
        },

        async getStudentsHandler(req, res) {
            const { course } = req.query;

            let students;
            if (course) {
                students = await studentService.getStudentsByCourse(course);
            } else {
                students = await studentService.getAllStudents();
            }

            res.send({ students: students });
        }
    };
}

module.exports = { createStudentHandlers };