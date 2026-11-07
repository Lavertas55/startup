import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useParams } from 'react-router-dom';
import { MessageDialog } from './messageDialog';

export function AddStudentForm({ show, onToggle, onStudentAdded }) {
    const { courseId: routeCourseId } = useParams();

    const [displayError, setDisplayError] = React.useState(null);
    const [courses, setCourses] = React.useState([]);

    const [netId, setNetId] = React.useState('');
    const [studentName, setStudentName] = React.useState('');
    const [courseId, setCourseId] = React.useState(routeCourseId || '');
    
    React.useEffect(() => {
        fetch('/api/course')
            .then((response) => response.json())
            .then(({ courses }) => setCourses(courses));
    }, []);

    const courseOptions = [];
    if (courses.length) {
        for (const course of courses) {
            courseOptions.push(
                <option
                    key={course.id}
                    value={course.id}
                >
                    { `${course.id}: ${course.name}` }
                </option>
            );
        }
    }

    async function submitForm(event) {
        event.preventDefault();
        if (!netId.trim() || !studentName.trim() || !courseId.trim()) return;

        const course = courseId.trim();
        const id = netId.trim();
        const student = {
            id: id,
            name: studentName,
            classes: [course] 
        };

        const response = await fetch('/api/student', {
            method: "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(student)
        });

        if (response?.ok) {
            onStudentAdded();
            onToggle(false);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`)
        }

        setCourseId(routeCourseId || '');
        setNetId('');
        setStudentName('');
    }

    return (
        <>
            <Modal show={show} centered onHide={() => onToggle(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Student</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <form id="add-student" onSubmit={submitForm}>
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
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                >
                                    <option value="">Choose...</option>
                                    { courseOptions }
                                </select>
                            </div>
                
                            <div className="col-12 col-md-6">
                                <label htmlFor="profile-pic" className="form-label">Picture:</label>
                                <input className="form-control" type="file" id="profile-pic" name="profile-pic" accept=".jpg,.png" />
                            </div>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <div className="btn-container centered">
                        <Button variant="success" type="submit" form="add-student">
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
                </Modal.Footer>
            </Modal>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}
