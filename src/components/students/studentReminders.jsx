import Button from 'react-bootstrap/Button';

export function StudentReminders() {
    async function submitForm(event) {
        event.preventDefault();
    }

    async function deleteReminder(event) {

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
                                <tr>
                                    <td>
                                        <div className="reminder">
                                            <span>9/26/2026 @ 1:00 PM</span>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                type="button" 
                                                id="delete" 
                                                aria-label="delete reminder"
                                                onClick={deleteReminder}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
        
                    <form className="mt-3" onSubmit={submitForm}>
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