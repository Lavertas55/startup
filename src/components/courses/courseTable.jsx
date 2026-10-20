import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function CourseTable({ onToggle }) {
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
                        <tr>
                            <th scope="row">CS 111</th>
                            <td><Link className="text-reset" to="/course/cs111">Introduction to Computer Science</Link></td>
                            <td>100</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
