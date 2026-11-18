import { StudentReminders } from "../components/students/studentReminders";
import { StudentContacts } from "../components/students/studentContacts";

export function Student() {
    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <StudentContacts />

                <StudentReminders />
            </div>
        </main>
    );
}
