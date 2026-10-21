import React from 'react';
import Button from 'react-bootstrap/Button';
import { addCourse } from '../../services/realtimeData';

export function AddCourseForm({ onToggle }) {
    const [className, setClassName] = React.useState('');
    const [classCode, setClassCode] = React.useState('');

    function submitForm(event) {
        event.preventDefault();
        if (!className.trim() || !classCode.trim()) return;

        const code = classCode.trim();
        addCourse({
            id: code.toLowerCase().replace(/[^a-z0-9]+/g, ''),
            code,
            name: className.trim(),
        });
        onToggle(false);
    }

    return (
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
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            id="class-code"
                            name="class-code" 
                        />
                    </div>

                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="name">Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
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
    );
}
