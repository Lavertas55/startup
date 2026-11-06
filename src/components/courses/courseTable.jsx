import React from 'react';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function CourseTable({ onToggle, refreshKey }) {
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/courses')
            .then((response) => response.json())
            .then(({ courses }) => {
                setCourses(courses);
            });
    }, [refreshKey]);

    const courseRows = [];
    if (courses.length) {
        for (const [i, course] of courses.entries()) {
            courseRows.push(
                <tr key={course.courseCode}>
                    <th scope="row">{course.courseCode}</th>
                    <td><Link className="text-reset" to={`/course/${course.courseCode}`}>{course.courseName}</Link></td>
                    <td>{course.students.length}</td>
                </tr>
            );
        }
    } else {
        courseRows.push(
            <tr key='0'>
                <td className='text-center' colSpan='3'>Create your first Course!</td>
            </tr>
        );
    }

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
                            <th scope="col"># Students</th>
                        </tr>
                    </thead>

                    <tbody className="table-group-divider">
                        {courseRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
