import { Link } from "react-router-dom";

function StudentContacts() {
    return (
        <div className="card rounded-3">
            <div className="card-header">
                <div className="table-header-container">
                    <img alt="profile picture for cosmo cougar" src="/images/ccougar.svg" />
                    <div className="table-header">
                        <h1>Cosmo Cougar</h1>
                        <div className="table-subtitle">
                            <h4>NetID: ccougar</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body">
                <div className="table-title">
                    <h3>Contact Attempts</h3>
                </div>
                    
                <table className="table table-bordered md-0 mb-0 table-responsive table-light table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Timestamp</th>
                            <th scope="col">Instructor</th>
                            <th scope="col">Method</th>
                            <th scope="col">Success</th>
                        </tr>
                    </thead>
        
                    <tbody className="table-group-divider">
                        <tr>
                            <th scope="row"><Link className="text-reset" to="/contact/1">9/15/2026 @ 5:34 PM</Link></th>
                            <td>Shane Reese</td>
                            <td>Email</td>
                            <td className="contact-status"><input className="form-check-input" type="checkbox" aria-label="contact success" disabled checked/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StudentReminders() {
    return (
        <div className="card rounded-3 mt-3">
            <div className="card-header">
                <div className="table-header-container">
                    <div className="table-header">
                        <h2>Reminders</h2>
                    </div>
                </div>
            </div>

            <div className="card-body">
                <div className="reminders-container">
                    <div className="table-title">
                        <h3>Pending Reminders</h3>
                    </div>

                    <div id="reminders-table">
                        <table className="table table-bordered md-0 mb-0 table-responsive table-light table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Timestamp</th>
                                </tr>
                            </thead>
            
                            <tbody className="table-group-divider">
                                <tr>
                                    <td>
                                        <div className="reminder">
                                            <span>9/26/2026 @ 1:00 PM</span>
                                            <button className="btn btn-danger btn-sm" type="button" id="delete" aria-label="delete reminder">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
        
                    <form className="mt-3">
                        <div className="input-group">
                            <label className="input-group-text" htmlFor="timestamp">Date:</label>
                            <input className="form-control" type="datetime-local" id="timestamp" name="timestamp" />
                            <button type="submit" className="btn btn-success">Add Reminder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export function Student() {
    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <StudentContacts />

                {/* Reminders will be delivered using the Discord API */}
                <StudentReminders />
            </div>
        </main>
    );
}
