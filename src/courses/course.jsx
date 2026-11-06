import React from 'react';

import { StudentTable } from "../components/shared/studentTable";
import { AddStudentForm } from '../components/shared/addStudentForm';

export function Course() {
    const [formVisible, setFormVisible] = React.useState(false);
    const [courseRefreshKey, setCourseRefreshKey] = React.useState(0);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <StudentTable
                    onToggle={setFormVisible}
                    refreshKey = {courseRefreshKey}
                />

                <AddStudentForm 
                    show={formVisible}
                    onToggle={setFormVisible}
                    onAddStudent={() => setCourseRefreshKey((key) => key + 1)}
                />
            </div>
        </main>
    );
}
