import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from '../shared/messageDialog';

export function AddCourseForm({ onToggle }) {
    const [courseName, setCourseName] = React.useState('');
    const [courseCode, setCourseCode] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function submitForm(event) {
        event.preventDefault();
        if (!courseName.trim() || !courseCode.trim()) return;

        const code = courseCode.trim();
        const course = {
            courseName: courseName,
            courseCode: code
        }

        const response = await fetch(`/api/courses`, {
                method: 'post',
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(course)
        });
        const body = await response.json();

        if (response?.status === 200) {
            onToggle(false);
        } else {
            setDisplayError(`⚠ Error: ${body.msg}`)
        }

    }

    return (
        <>
            <div className="card rounded-3">
                <div className="card-header">
                    <h2>Add Course</h2>
                </div>

                <div className="card-body">
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

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Button
                                variant="success"
                                type="submit"
                            >
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
                        </div>
                    </form>
                </div>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}
