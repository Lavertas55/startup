import React from 'react';
import Button from 'react-bootstrap/Button';
import { updateContact } from '../../services/realtimeData';

export function EditContactForm({ contact, onToggle }) {
    const [timestamp, setTimestamp] = React.useState(contact.timestamp);
    const [instructor, setInstructor] = React.useState(contact.instructor);
    const [method, setMethod] = React.useState(contact.method);
    const [success, setSuccess] = React.useState(contact.success);
    const [notes, setNotes] = React.useState(contact.notes);

    function saveContact(event) {
        event.preventDefault();
        updateContact({ ...contact, timestamp, instructor, method, success, notes });
        onToggle(false);
    }

    return (
        <div className="card rounded-3">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title">
                        <h1>Edit Contact</h1>
                        <div className="table-subtitle">
                            <h4>{contact.studentId}</h4>
                        </div>
                    </div>

                    <div className="btn-container">
                        <Button variant="success" type="submit" id="save" form="contact-form">Save</Button>
                        <Button variant="danger" type="button" id="cancel" onClick={() => onToggle(false)}>Cancel</Button>
                    </div>

                </div>
            </div>

            <div className="card-body">
                <form id="contact-form" onSubmit={saveContact}>
                    <div className="row g-3 mb-2">
                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="timestamp">Timestamp:</label>
                            <input className="form-control" type="datetime-local" id="timestamp" name="timestamp" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} />
                        </div>

                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="instructor">Instructor:</label>
                            <select className="form-select" id="instructor" name="instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)}>
                                <optgroup label="Instructors">
                                <option value="Shane Reese">Shane Reese</option>
                                </optgroup>
                                <optgroup label="TA">
                                    <option value="Collin Mickelson">Collin Mickelson</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    <div className="row g-3 mb-2">
                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="method">Method:</label>
                            <select className="form-select" id="method" name="method" value={method} onChange={(e) => setMethod(e.target.value)}>
                                <option>Email</option>
                                <option>Canvas</option>
                                <option>Discord</option>
                                <option>In Person</option>
                            </select>
                        </div>

                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="success">Success:</label>
                            <input className="form-check-input" type="checkbox" id="success" name="success" checked={success} onChange={(e) => setSuccess(e.target.checked)} />
                        </div>
                    </div>

                    <div className="row g-3 mb-2">
                        <div className="col">
                            <label className="form-label" htmlFor="notes">Notes:</label>
                            <textarea className="form-control" id="notes"
                                name="notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
