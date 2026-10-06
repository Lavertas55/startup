import React from 'react';

function CourseTable() {
    return (
        <div className="card rounded-3 mb-3" id="courses-table">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title mb-2">
                        <h1>Courses</h1>
                    </div>
                    
                    <button className="btn btn-primary" type="button" id="add-course-btn">Add Course</button>
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
                            <td><a className="text-reset" href="example-course.html">Introduction to Computer Science</a></td>
                            <td>100</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AddCourseForm() {
    return (
        <div className="card rounded-3">
            <div className="card-header">
                <h2>Add Course</h2>
            </div>

            <div className="card-body">
                <form id="add-course">                    
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="class-code">Class Code:</label>
                        <input className="form-control" type="text" id="class-code" name="class-code" />
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="name">Name:</label>
                        <input className="form-control" type="text" id="name" name="name" />
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-success" type="submit">Add</button>
                        <button className="btn btn-danger" type="button" id="cancel-add">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function Courses() {
    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <section>
                    
                    <CourseTable />
        
                    {/* Normally the form will be hidden until the user clicks the add course button */}
        
                    <AddCourseForm />
                    
                </section>
            </div>
        </main>
    );
}