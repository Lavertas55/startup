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
                                        <td><a className="text-reset" href="example-student.html">Cosmo Cougar</a></td>
                                        <td><a className="text-reset" href="example-course.html">CS 111</a></td>
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