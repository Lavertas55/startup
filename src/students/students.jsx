import { Link } from "react-router-dom";

export function Students() {
    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <section>
                    <div className="card rounded-3" id="students-table">
                        <div className="card-header">
                            <div className="table-title-container">
                                <div className="table-title mb-2">
                                    <h1>Students</h1>
                                </div>
                                
                                <div className="btn-container">
                                    <Link className="btn btn-primary" to="/add-student">
                                        Add Student
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <table className="table table-bordered md-0 mb-0 table-responsive table-light table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Net ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Courses</th>
                                    </tr>
                                </thead>
            
                                <tbody className="table-group-divider">
                                    <tr>
                                        <th scope="row">ccougar</th>
                                        <td><Link className="text-reset" to="/student/ccougar">Cosmo Cougar</Link></td>
                                        <td><Link className="text-reset" to="/course/cs111">CS 111</Link></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}