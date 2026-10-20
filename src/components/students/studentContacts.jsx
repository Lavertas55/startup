import { Link } from "react-router-dom";

export function StudentContacts() {
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
