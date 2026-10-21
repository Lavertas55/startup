import React from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

import { useRealtimeData, removeReminder, addReminder } from '../../services/realtimeData';

function currentDateTime() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().slice(0, 16);
}

export function StudentReminders() {
    const { studentId = 'ccougar' } = useParams();
    const { reminders } = useRealtimeData();
    const [timestamp, setTimestamp] = React.useState(currentDateTime);

    const studentReminders = reminders
        .filter((reminder) => reminder.studentId === studentId)
        .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    async function submitForm(event) {
        event.preventDefault();
        addReminder({
            id: String(Date.now()),
            studentId,
            timestamp,
        });
        setTimestamp(currentDateTime());
    }
    
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
                                {studentReminders.map((reminder) => (
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
                                                    onClick={() => removeReminder(reminder.id)}
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
    );
}