import Button from 'react-bootstrap/Button';

export function EditContactForm({ onToggle }) {
    async function updateContact() {
        onToggle(false);
    }

    return (
        <div className="card rounded-3">
            <div className="card-header">
                <div className="table-title-container">
                    <div className="table-title">
                        <h1>Cosmo Cougar</h1>
                        <div className="table-subtitle">
                            <h4>ccougar</h4>
                        </div>
                    </div>

                    <div className="btn-container">
                        <Button variant="success" type="button" id="save" onClick={() => updateContact()}>Save</Button>
                        <button variant="danger" type="button" id="cancel" onClick={() => onToggle(false)}>Cancel</button>
                    </div>

                </div>
            </div>

            <div className="card-body">
                <form id="contact-form">
                    <div className="row g-3 mb-2">
                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="timestamp">Timestamp:</label>
                            <input className="form-control" type="datetime-local" id="timestamp" name="timestamp" defaultValue="2026-09-15T17:34" />
                        </div>

                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="instructor">Instructor:</label>
                            <select className="form-select" id="instructor" name="instructor">
                                <optgroup label="Instructors">
                                    <option defaultValue>Shane Reese</option>
                                </optgroup>
                                <optgroup label="TA">
                                    <option>Collin Mickelson</option>
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    <div className="row g-3 mb-2">
                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="method">Method:</label>
                            <select className="form-select" id="method" name="method">
                                <option defaultValue>Email</option>
                                <option>Canvas</option>
                                <option>Discord</option>
                                <option>In Person</option>
                            </select>
                        </div>

                        <div className="col col-md-6">
                            <label className="form-label" htmlFor="success">Success:</label>
                            <input className="form-check-input" type="checkbox" id="success" name="success" defaultChecked />
                        </div>
                    </div>

                    <div className="row g-3 mb-2">
                        <div className="col">
                            <label className="form-label" htmlFor="notes">Notes:</label>
                            <textarea className="form-control" id="notes"
                                name="notes" defaultValue="Cosmo is behind on his homework. We discussed the late policy and worked to establish a plan to remember his assignments. We will talk again in one week."></textarea>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}