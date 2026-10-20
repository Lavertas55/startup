import React from 'react';

import { StudentTable } from '../components/courses/studentTable';
import { AddStudentForm } from '../components/students/addStudentForm';

export function Students() {
    const [formVisible, setFormVisible] = React.useState(false);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                {!formVisible && (
                    <StudentTable onToggle={setFormVisible} />
                )}

                {formVisible && (
                    <AddStudentForm onToggle={setFormVisible} />
                )}
            </div>
        </main>
    );
}