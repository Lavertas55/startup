import Button from 'react-bootstrap/Button';
import { useRealtimeData } from '../../services/realtimeData';

export function ContactInfo({ contact, onToggle }) {
    const timestamp = new Date(contact.timestamp).toLocaleString();
    const { students } = useRealtimeData();
    const student = students.find((item) => item.id === contact.studentId);
    return (
        <div className="card rounded-3 mb-3">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title">
                        <h1>{student?.name ?? contact.studentId}</h1>

                        <div className="table-subtitle">
                            <h4>NetID: {contact.studentId}</h4>
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
                            <td>{timestamp}</td>
                        </tr>
                        <tr>
                            <th>Instructor:</th>
                            <td>{contact.instructor}</td>
                        </tr>
                        <tr>
                            <th>Method:</th>
                            <td>{contact.method}</td>
                        </tr>
                        <tr>
                            <th>Success:</th>
                            <td><input className="form-check-input" type="checkbox" id="success" name="success" checked={contact.success} readOnly disabled /></td>
                        </tr>
                        <tr>
                            <th>Notes:</th>
                            <td>
                                <p>
                                    {contact.notes}
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
    
            </div>  
        </div>
    );
}
