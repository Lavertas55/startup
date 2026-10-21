import React from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { addStudent, useRealtimeData } from '../../services/realtimeData';

export function AddStudentForm({ onToggle }) {
    const { courseId: routeCourseId } = useParams();
    const { courses } = useRealtimeData();
    const [netId, setNetId] = React.useState('');
    const [studentName, setStudentName] = React.useState('');
    const [classId, setClassId] = React.useState(routeCourseId || '');
    
    async function submitForm(event) {
        event.preventDefault();
        if (!netId.trim() || !studentName.trim()) return;
        const courseIds = classId ? [classId] : [];
        addStudent({
            id: netId.trim().toLowerCase(),
            name: studentName.trim(),
            courseIds,
        });
        onToggle(false);
    }

    return (
        <div>
            <div className="card rounded-3">
                <div className="card-header">
                    <h1>Add Student</h1>
                </div>
                <div className="card-body p-3">
                    <div id="addStudentForm">
                        <form onSubmit={submitForm}>
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="netid">Net ID:</label>
                                    <input 
                                        className="form-control"
                                        type="text"
                                        id="netid"
                                        name="netid"
                                        value={netId}
                                        onChange={(e) => setNetId(e.target.value)}
                                    />
                                </div>
                
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="name">Name:</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                    />
                                </div>  
                            </div>
                            
                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <label htmlFor="inputClass" className="form-label">Class</label>
                                    <select
                                        id="inputClass"
                                        className="form-select"
                                        value={classId}
                                        onChange={(e) => setClassId(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        {courses.map((course) => (
                                            <option key={course.id} value={course.id}>{course.code}: {course.name}</option>
                                        ))}
                                    </select>
                                </div>
                    
                                <div className="col-12 col-md-6">
                                    <label htmlFor="profile-pic" className="form-label">Picture:</label>
                                    <input className="form-control" type="file" id="profile-pic" name="profile-pic" accept=".jpg,.png" />
                                </div>
                            </div>
                            
                            <div className="btn-container centered">
                                <Button variant="success" type="submit">
                                    Add
                                </Button>
                                
                                <Button variant="danger" onClick={() => onToggle(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
