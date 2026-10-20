import React from 'react';

import { CourseTable } from '../components/courses/courseTable';
import { AddCourseForm } from '../components/courses/courseForm';

export function Courses() {
    const [formVisible, setFormVisible] = React.useState(false);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <section>
                    
                    {!formVisible && (
                        <CourseTable onToggle={setFormVisible} />
                    )}

                    {formVisible && (
                        <AddCourseForm onToggle={setFormVisible} />
                    )}
                    
                </section>
            </div>
        </main>
    );
}