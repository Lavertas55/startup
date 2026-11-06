import React from 'react';

import { StudentTable } from '../components/shared/studentTable';
import { AddStudentForm } from '../components/shared/addStudentForm';

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