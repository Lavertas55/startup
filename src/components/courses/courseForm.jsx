import { apiFetch } from '../../utils/api-fetch';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MessageDialog } from '../shared/messageDialog';

export function AddCourseForm({ show, onToggle, onCourseAdded }) {
    const [courseName, setCourseName] = React.useState('');
    const [courseCode, setCourseCode] = React.useState('');
    const [webhookUrl, setWebhookUrl] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function submitForm(event) {
        event.preventDefault();
        if (!courseName.trim() || !courseCode.trim()) return;

        const code = courseCode.trim();
        const course = {
            courseName: courseName,
            courseCode: code,
            webhookUrl: webhookUrl.trim()
        };

        const response = await apiFetch(`/api/courses`, {
                method: 'post',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(course)
        });

        if (response?.ok) {
            onCourseAdded();
            onToggle(false);
        } else {
            setDisplayError(`⚠ Error: ${body.msg}`)
        }

    }

    return (
        <>
            <Modal show={show} centered onHide={() => onToggle(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Course</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form id="add-course" onSubmit={submitForm}>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="class-code">Class Code:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)}
                                id="class-code"
                                name="class-code"
                            />
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="webhook-url">Discord Webhook URL (optional):</label>
                            <input className="form-control" type="url" value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)} id="webhook-url" name="webhook-url" />
                        </div>

                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor="name">Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                id="name"
                                name="name"
                            />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" type="submit" form="add-course">
                        Add
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={() => onToggle(false)}
                        id="cancel-add"
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}
