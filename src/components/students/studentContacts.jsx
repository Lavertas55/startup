import { apiFetch } from '../../utils/api-fetch';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { MessageDialog } from '../shared/messageDialog';

function currentDateTime() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
}

async function fetchStudentContacts(studentId) {
    const response = await apiFetch(`/api/contact?student=${studentId}`);
    if (!response.ok) {
        throw new Error('Failed to load contacts.');
    }

    const { contacts } = await response.json();
    return contacts;
}

export function StudentContacts() {
    const { studentId } = useParams();

    const [formVisible, setFormVisible] = React.useState(false);
    const [displayError, setDisplayError] = React.useState(null);
    const [contacts, setContacts] = React.useState([]);
    const [courses, setCourses] = React.useState([]);

    const [student, setStudent] = React.useState(null);

    const [timestamp, setTimestamp] = React.useState(currentDateTime);
    const [instructor, setInstructor] = React.useState("");
    const [method, setMethod] = React.useState("Email");
    const [success, setSuccess] = React.useState(false);
    const [course, setCourse] = React.useState("");

    React.useEffect(() => {
        apiFetch(`/api/student/${studentId}`)
            .then((response) => response.json())
            .then((student) => setStudent(student));

        fetchStudentContacts(studentId)
            .then(setContacts)
            .catch((error) => setDisplayError(`⚠ Error: ${error.message}`));
    }, [studentId]);

    React.useEffect(() => {
        if (student) {
            setCourses(student['courses']);
        }
    }, [student]);

    const contactRows = [];
    if (contacts.length) {
        for (const [index, contact] of contacts.entries()) {
            const timestampLabel = new Date(contact.timestamp).toLocaleString();
            contactRows.push(
                <tr key={`${contact.timestamp}-${index}`}>
                    <th scope="row">
                        {timestampLabel}
                    </th>
                    <td>{contact.instructor}</td>
                    <td>{contact.method}</td>
                    <td className="contact-status">
                        <input 
                            className="form-check-input"
                            type="checkbox"
                            aria-label="contact success"
                            checked={contact.success}
                            readOnly
                            disabled
                        />
                    </td>
                </tr>
            );
        }
    } else {
        contactRows.push(
            <tr key="0">
                <td className="text-center" colSpan="4">No Contacts</td>
            </tr>
        )
    }

    const courseOptions = [];
    if (courses.length) {
        for (const courseOption of courses) {
            courseOptions.push(
                <option value={courseOption}>{courseOption}</option>
            );
        }
    }

    async function submitContact(event) {
        event.preventDefault();

        const contact = {
            student: studentId,
            course: course,
            timestamp: timestamp,
            instructor: instructor,
            method: method,
            success
        };

        try {
            const response = await apiFetch('/api/contact', {
                method: 'post',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(contact)
            });

            if (response.ok) {
                setFormVisible(false);
                setTimestamp(currentDateTime());
                setCourse("");
                setInstructor("");
                setSuccess(false);
                try {
                    setContacts(await fetchStudentContacts(studentId));
                } catch (error) {
                    setDisplayError(`⚠ Error: Contact was saved, but the list could not be refreshed. ${error.message}`);
                }
            } else {
                const body = await response.json().catch(() => null);
                setDisplayError(`⚠ Error: ${body?.msg || response.statusText || 'Unable to save contact.'}`);
            }
        } catch (error) {
            setDisplayError(`⚠ Error: ${error.message || 'Could not connect to the server. Please try again.'}`);
        }
    }

    return (
        <>
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
                                <label className="form-label" htmlFor="contact-course">Course</label>
                                <select className="form-select" id="contact-course" value={course} onChange={(event) => setCourse(event.target.value)}>
                                    <option value="" disabled>Select a course...</option>
                                    {courseOptions}
                                </select>
                            </div>
                            <div className="col-12 col-md-4">
                                <label className="form-label" htmlFor="contact-instructor">Instructor</label>
                                <select className="form-select" id="contact-instructor" value={instructor} onChange={(event) => setInstructor(event.target.value)}>
                                    <option value="" disabled>Select an Instructor...</option>
                                    <optgroup label="Instructors">
                                        <option value="Shane Reese">Shane Reese</option>
                                    </optgroup>
                                    <optgroup label="TA">
                                        <option value="Collin Mickelson">Collin Mickelson</option>
                                    </optgroup>
                                </select>
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
                            <div className="col-12 col-md-4 d-flex align-items-end">
                                <div className="form-check mb-2">
                                    <input className="form-check-input" id="contact-success" type="checkbox" checked={success}
                                        onChange={(event) => setSuccess(event.target.checked)} />
                                    <label className="form-check-label" htmlFor="contact-success">Successful contact</label>
                                </div>
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
                        {contactRows}
                    </tbody>
                </table>
            </div>
        </div>
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}
