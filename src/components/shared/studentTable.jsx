import { apiFetch } from '../../utils/api-fetch';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function StudentTable({ onToggle, refreshKey}) {
    const [students, setStudents] = React.useState([]);
    const [course, setCourse] = React.useState(null);

    const { courseId } = useParams();

    React.useEffect(() => {
        if (courseId) {
            apiFetch(`/api/course/${courseId}`)
                .then((response) => response.json())
                .then(({ course }) => {
                    setCourse(course);
                });

            apiFetch(`/api/student?course=${courseId}`)
                .then((response) => response.json())
                .then(({ students }) => {
                    setStudents(students);
                });
        } else {
            apiFetch('/api/student')
                .then((response) => response.json())
                .then(({ students }) => {
                    setStudents(students);
                });
        }
    }, [refreshKey]);

    const studentRows = [];
    if (students.length) {
        for (const student of students) {
            studentRows.push(
                <tr key={student.id}>
                    <th scope="row">{student.id}</th>
                    <td>
                        <Link
                            className="text-reset"
                            to={`/student/${student.id}${courseId ? `?course=${courseId}` : ''}`}
                        >
                            {student.name}
                        </Link>
                    </td>
                    {courseId ? <td>{student.lastContact}</td> : ''}
                </tr>
            );
        }
    }

    return (
        <div className="card rounded-3 mt-3">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title">
                        <h1>{courseId ? course?.name ?? 'Course' : 'Students'}</h1>
            
                        <div className="table-subtitle">
                            {courseId && <h4>{course?.code}</h4>}
                        </div>
                    </div>

                    <div className="btn-container">
                        <Button 
                            variant="primary" 
                            onClick={() => onToggle(true)}
                        >
                            Add Student
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className="card-body">
                <table className="table table-bordered md-0 mb-0 table-responsive table-light table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            {courseId ? <th scope="col">Last Contact</th> : ''}
                        </tr>
                    </thead>
        
                    <tbody className="table-group-divider">
                        {studentRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
