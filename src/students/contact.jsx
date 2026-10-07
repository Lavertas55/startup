function ContactInfo() {
    return (
        <div className="card rounded-3 mb-3">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title">
                        <h1>Cosmo Cougar</h1>

                        <div className="table-subtitle">
                            <h4>ccougar</h4>
                        </div>
                    </div>
                    
                    <div className="btn-container">
                        <button className="btn btn-primary" type="button" id="edit-contact">Edit</button>
                    </div>
                </div>
            </div>
            
            <div className="card-body">
    
                <table className="table table-bordered md-0 mb-0 table-light table-striped" id="contact-details">
                    <tbody>
                        <tr>
                            <th>Timestamp:</th> 
                            <td>9/15/2026 @ 5:34 PM</td>
                        </tr>
                        <tr>
                            <th>Instructor:</th>
                            <td>Shane Reese</td>
                        </tr>
                        <tr>
                            <th>Method:</th>
                            <td>Email</td>
                        </tr>
                        <tr>
                            <th>Success:</th>
                            <td><input className="form-check-input" type="checkbox" id="success" name="success" defaultChecked disabled /></td>
                        </tr>
                        <tr>
                            <th>Notes:</th>
                            <td>
                                <p>
                                    Cosmo is behind on his homework. We discussed the late policy
                                    and worked to establish a plan to remember his assignments.
                                    We will talk again in one week.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
    
            </div>  
        </div>
    );
}

function EditContactForm() {
    return (
        <div className="card rounded-3">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title">
                        <h1>Cosmo Cougar</h1>
                        <div className="table-subtitle">
                            <h4>ccougar</h4>
                        </div>
                    </div>

                    <div className="btn-container">
                        <button className="btn btn-success" type="button" id="save">Save</button>
                        <button className="btn btn-danger" type="button" id="cancel">Cancel</button>
                    </div>

                </div>
            </div>

            <div className="card-body">
                <form id="contact-form">
                    <div className="row g-3 mb-2">
                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="timestamp">Timestamp:</label>
                            <input className="form-control" type="datetime-local" id="timestamp" name="timestamp" defaultValue="2026-09-15T17:34" />
                        </div>

                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="instructor">Instructor:</label>
                            <select className="form-select" id="instructor" name="instructor">
                                <optgroup label="Instructors">
                                    <option defaultValue>Shane Reese</option>
                                </optgroup>
                                <optgroup label="TA">
                                    <option>Collin Mickelson</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    <div className="row g-3 mb-2">
                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="method">Method:</label>
                            <select className="form-select" id="method" name="method">
                                <option defaultValue>Email</option>
                                <option>Canvas</option>
                                <option>Discord</option>
                                <option>In Person</option>
                            </select>
                        </div>

                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="success">Success:</label>
                            <input className="form-check-input" type="checkbox" id="success" name="success" defaultChecked />
                        </div>
                    </div>

                    <div className="row g-3 mb-2">
                        <div className="col">
                            <label className="form-label" htmlFor="notes">Notes:</label>
                            <textarea className="form-control" id="notes"
                                name="notes" defaultValue="Cosmo is behind on his homework. We discussed the late policy and worked to establish a plan to remember his assignments. We will talk again in one week."></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function Contact() {
    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <ContactInfo />

                {/* The form will normally be hidden until the user pushes the edit button */}

                <EditContactForm />
            </div>
        </main>
    );
}
