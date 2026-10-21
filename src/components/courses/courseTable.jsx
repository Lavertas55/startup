import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useRealtimeData } from '../../services/realtimeData';

export function CourseTable({ onToggle }) {
    const { courses, students } = useRealtimeData();

    return (
        <div className="card rounded-3 mb-3" id="courses-table">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title mb-2">
                        <h1>Courses</h1>
                    </div>
                    
                    <Button
                        variant="primary"
                        type="button"
                        id="add-course-btn"
                        onClick={() => onToggle(true)}
                    >
                        Add Course
                    </Button>
                </div>
            </div>

            <div className="card-body">
                <table className="table table-bordered md-0 mb-0 table-responsive table-light table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Name</th>
                            <th scope="col">&num; Students</th>
                        </tr>
                    </thead>

                    <tbody className="table-group-divider">
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <th scope="row">{course.code}</th>
                                <td><Link className="text-reset" to={`/course/${course.id}`}>{course.name}</Link></td>
                                <td>{students.filter((student) => student.courseIds.includes(course.id)).length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
