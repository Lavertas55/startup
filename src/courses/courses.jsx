import React from 'react';

import { CourseTable } from '../components/courses/courseTable';
import { AddCourseForm } from '../components/courses/courseForm';

export function Courses() {
    const [formVisible, setFormVisible] = React.useState(false);
    const [courseRefreshKey, setCourseRefreshKey] = React.useState(0);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <section>
                    <CourseTable onToggle={setFormVisible} refreshKey={courseRefreshKey} />

                    <AddCourseForm
                        show={formVisible}
                        onToggle={setFormVisible}
                        onCourseAdded={() => setCourseRefreshKey((key) => key + 1)}
                    />
                    
                </section>
            </div>
        </main>
    );
}