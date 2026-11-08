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
    const response = await fetch(`/api/reminder?student=${encodeURIComponent(studentId)}`);
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.msg || 'Failed to load reminders.');
    }

    const { reminders } = await response.json();
    return reminders.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function StudentReminders() {
    const { studentId } = useParams();
    const [reminders, setReminders] = React.useState([]);
    const [displayError, setDisplayError] = React.useState(null);
    const [timestamp, setTimestamp] = React.useState(currentDateTime);

    React.useEffect(() => {
        fetchStudentReminders(studentId)
            .then(setReminders)
            .catch((error) => setDisplayError(`⚠ Error: ${error.message}`));
    }, [studentId]);

    async function submitForm(event) {
        event.preventDefault();
        try {
            const response = await fetch('/api/reminder', {
                method: 'post',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ studentId, timestamp })
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
            const response = await fetch(`/api/reminder/${encodeURIComponent(reminderId)}`, {
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
                                {reminders.map((reminder) => (
                                    <tr key={reminder.id}>
                                        <td>
                                            <div className="reminder">
                                                <span>{new Date(reminder.timestamp).toLocaleString()}</span>
                                                <Button
                                                    variant='danger'
                                                    size='sm'
                                                    type='button'
                                                    id={`delete-${reminder.id}`}
                                                    aria-label="delete reminder"
                                                    onClick={() => deleteReminder(reminder.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
        
                    <form className="mt-3" onSubmit={submitForm}>
                        <div className="input-group">
                            <label className="input-group-text" htmlFor="timestamp">Date:</label>
                            <input
                                className="form-control"
                                type="datetime-local"
                                id="timestamp"
                                name="timestamp"
                                value={timestamp}
                                onChange={(e) => setTimestamp(e.target.value)}
                            />
                            <Button type="submit" variant="success">Add Reminder</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}