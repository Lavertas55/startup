import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { useRealtimeData } from '../../services/realtimeData';

export function StudentTable({ onToggle, courseView = false }) {
    const { courseId } = useParams();
    const { courses, students, contacts } = useRealtimeData();
    const course = courses.find((item) => item.id === courseId);
    const visibleStudents = courseView
        ? students.filter((student) => student.courseIds.includes(courseId))
        : students;

    return (
        <div className="card rounded-3 mt-3">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title">
                        <h1>{courseView ? course?.name ?? 'Course' : 'Students'}</h1>
            
                        <div className="table-subtitle">
                            {courseView && <h4>{course?.code}</h4>}
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
                            <th scope="col">{courseView ? 'Last Contact' : 'Courses'}</th>
                        </tr>
                    </thead>
        
                    <tbody className="table-group-divider">
                        {visibleStudents.map((student) => {
                            const latestContact = contacts
                                .filter((contact) => contact.studentId === student.id)
                                .sort((a, b) => b.timestamp.localeCompare(a.timestamp))[0];
                            const studentCourses = courses.filter((item) => student.courseIds.includes(item.id));
                            return (
                                <tr key={student.id}>
                                    <th scope="row">{student.id}</th>
                                    <td><Link className="text-reset" to={`/student/${student.id}`}>{student.name}</Link></td>
                                    <td>{courseView
                                        ? latestContact?.timestamp ? new Date(latestContact.timestamp).toLocaleString() : '—'
                                        : studentCourses.map((item) => <React.Fragment key={item.id}><Link className="text-reset" to={`/course/${item.id}`}>{item.code}</Link>{' '}</React.Fragment>)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
