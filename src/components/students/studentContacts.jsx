import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { addContact, useRealtimeData } from '../../services/realtimeData';

function currentDateTime() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
}

export function StudentContacts() {
    const { studentId = 'ccougar' } = useParams();
    const { students, contacts } = useRealtimeData();
    const [formVisible, setFormVisible] = React.useState(false);
    const [timestamp, setTimestamp] = React.useState(currentDateTime);
    const [instructor, setInstructor] = React.useState('Shane Reese');
    const [method, setMethod] = React.useState('Email');

    const student = students.find((item) => item.id === studentId);
    const studentContacts = contacts
        .filter((contact) => contact.studentId === studentId)
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    function submitContact(event) {
        event.preventDefault();
        addContact({
            id: String(Date.now()),
            studentId,
            timestamp,
            instructor,
            method,
            success: true,
            notes: '',
        });
        setFormVisible(false);
        setTimestamp(currentDateTime());
    }

    return (
        <div className="card rounded-3">
            <div className="card-header">
                <div className="table-header-container">
                    <img alt={`profile picture for ${student?.name ?? studentId}`} src="/images/ccougar.svg" />
                    <div className="table-header">
                        <h1>{student?.name ?? studentId}</h1>
                        <div className="table-subtitle">
                            <h4>NetID: {studentId}</h4>
                        </div>
                    </div>
                    <Button className="ms-auto" variant="primary" onClick={() => setFormVisible((visible) => !visible)}>
                        {formVisible ? 'Cancel' : 'Add Contact'}
                    </Button>
                </div>
            </div>

            <div className="card-body">
                {formVisible && (
                    <form className="mb-3" onSubmit={submitContact}>
                        <div className="row g-3">
                            <div className="col-12 col-md-4">
                                <label className="form-label" htmlFor="contact-timestamp">Timestamp</label>
                                <input className="form-control" id="contact-timestamp" type="datetime-local" value={timestamp} onChange={(event) => setTimestamp(event.target.value)} />
                            </div>
                            <div className="col-12 col-md-4">
                                <label className="form-label" htmlFor="contact-instructor">Instructor</label>
                                <input className="form-control" id="contact-instructor" value={instructor} onChange={(event) => setInstructor(event.target.value)} />
                            </div>
                            <div className="col-12 col-md-4">
                                <label className="form-label" htmlFor="contact-method">Method</label>
                                <select className="form-select" id="contact-method" value={method} onChange={(event) => setMethod(event.target.value)}>
                                    <option>Email</option>
                                    <option>Canvas</option>
                                    <option>Discord</option>
                                    <option>In Person</option>
                                </select>
                            </div>
                        </div>
                        <Button className="mt-3" variant="success" type="submit">Save Contact</Button>
                    </form>
                )}

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
                        {studentContacts.map((contact) => (
                            <tr key={contact.id}>
                                <th scope="row"><Link className="text-reset" to={`/contact/${contact.id}`}>{new Date(contact.timestamp).toLocaleString()}</Link></th>
                                <td>{contact.instructor}</td>
                                <td>{contact.method}</td>
                                <td className="contact-status"><input className="form-check-input" type="checkbox" aria-label="contact success" checked={contact.success} readOnly disabled /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
