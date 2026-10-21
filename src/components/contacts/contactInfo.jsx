import Button from 'react-bootstrap/Button';

export function ContactInfo({ onToggle }) {
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
                        <Button variant="primary" type="button" id="edit-contact" onClick={() => onToggle(true)}>Edit</Button>
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