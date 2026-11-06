import React from 'react';

import { StudentTable } from '../components/shared/studentTable';
import { AddStudentForm } from '../components/shared/addStudentForm';

export function Students() {
    const [formVisible, setFormVisible] = React.useState(false);
    const [refreshKey, setCourseRefreshKey] = React.useState(0);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <StudentTable onToggle={setFormVisible} refreshKey={refreshKey} />

                <AddStudentForm 
                    show={formVisible}
                    onToggle={setFormVisible}
                    onStudentAdded={() => setCourseRefreshKey((key) => key + 1) } 
                />
            </div>
        </main>
    );
}