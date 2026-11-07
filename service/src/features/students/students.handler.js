function createStudentHandlers(studentService, courseService) {
    return {
        async addStudentHandler(req, res) {
            const student = await studentService.addStudent(
                req.body.id,
                req.body.name,
                req.body.classes
            );

            res.send({ id: student.id });
        },

        async getStudentHandler(req, res) {
            const student = await studentService.getStudent('id', req.params.id);

            res.send({
                id: student.id,
                name: student.name,
                classes: student.classes
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