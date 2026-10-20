import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function StudentTable({ onToggle }) {
    return (
        <div className="card rounded-3 mt-3">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title">
                        <h1>Introduction to Computer Science</h1>
            
                        <div className="table-subtitle">
                            <h4>CS 111</h4>
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
                            <th scope="col">Last Contact</th>
                        </tr>
                    </thead>
        
                    <tbody className="table-group-divider">
                        <tr>
                            <th scope="row">ccougar</th>
                            <td><Link className="text-reset" to="/student/ccougar">Cosmo Cougar</Link></td>
                            <td>9/15/2026 @ 5:34 PM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}