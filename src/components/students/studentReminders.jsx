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

async function fetchStudentReminders(studentId) {
    const response = await apiFetch(`/api/reminder?student=${encodeURIComponent(studentId)}`);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.msg || 'Failed to load reminders.');
    }

    const { reminders } = await response.json();
    return reminders
        .filter((reminder) => !reminder.delivered && !reminder.deliveryError)
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function StudentReminders() {
    const { studentId } = useParams();
    const [reminders, setReminders] = React.useState([]);
    const [displayError, setDisplayError] = React.useState(null);
    const [timestamp, setTimestamp] = React.useState(currentDateTime);
    const [courses, setCourses] = React.useState([]);
    const [courseId, setCourseId] = React.useState('');

    React.useEffect(() => {
        apiFetch(`/api/student/${encodeURIComponent(studentId)}`)
            .then(async (response) => {
                if (!response.ok) throw new Error('Failed to load student courses.');
                return response.json();
            })
            .then((student) => {
                const enrolledCourses = student.courses || [];
                setCourses(enrolledCourses);
            })
            .catch((error) => setDisplayError(`⚠ Error: ${error.message}`));

        fetchStudentReminders(studentId)
            .then(setReminders)
            .catch((error) => setDisplayError(`⚠ Error: ${error.message}`));
    }, [studentId]);

    const reminderRows = [];
    if (reminders.length) {
        for (const reminder of reminders) {
            const timestampLabel = new Date(reminder.timestamp).toLocaleString();
            reminderRows.push(
                <tr key={reminder.id}>
                    <td>
                        <div className="reminder">
                            <span>{timestampLabel}</span>
                            <Button
                                variant="danger"
                                size="sm"
                                type="button"
                                id={`delete-${reminder.id}`}
                                aria-label="delete reminder"
                                onClick={() => deleteReminder(reminder.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </td>
                </tr>
            );
        }
    } else {
        reminderRows.push(
            <tr>
                <td className="text-center">No Reminders</td>
            </tr>
        )
    }

    async function submitForm(event) {
        event.preventDefault();
        try {
            const response = await apiFetch('/api/reminder', {
                method: 'post',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ studentId, timestamp, courseId })
            });

            if (!response.ok) {
                const body = await response.json();
                throw new Error(body.msg || 'Failed to create reminder.');
            }

            setReminders(await fetchStudentReminders(studentId));
            setTimestamp(currentDateTime());
        } catch (error) {
            setDisplayError(`⚠ Error: ${error.message}`);
        }
    }

    async function deleteReminder(reminderId) {
        try {
            const response = await apiFetch(`/api/reminder/${encodeURIComponent(reminderId)}`, {
                method: 'delete'
            });

            if (!response.ok) {
                const body = await response.json();
                throw new Error(body.msg || 'Failed to delete reminder.');
            }

            setReminders(await fetchStudentReminders(studentId));
        } catch (error) {
            setDisplayError(`⚠ Error: ${error.message}`);
        }
    }

    return (
        <>
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
                                {reminderRows}
                            </tbody>
                        </table>
                    </div>
        
                    <form className="mt-3" onSubmit={submitForm}>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="timestamp">Date:</label>
                            <input
                                className="form-control"
                                type="datetime-local"
                                id="timestamp"
                                name="timestamp"
                                value={timestamp}
                                onChange={(e) => setTimestamp(e.target.value)}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="reminder-course">Course:</label>
                            <select className="form-select" id="reminder-course" value={courseId}
                                onChange={(event) => setCourseId(event.target.value)} required disabled={!courses.length}>
                                <option value="" disabled>Select an enrolled course...</option>
                                {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                            </select>
                        </div>
                        <Button type="submit" variant="success" disabled={!courseId}>Add Reminder</Button>
                    </form>
                </div>
            </div>
        </div>
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}
