import { StudentReminders } from "../components/students/studentReminders";
import { StudentContacts } from "../components/students/studentContacts";

export function Student() {
    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                <StudentContacts />

                {/* Reminders will be delivered using the Discord API */}
                <StudentReminders />
            </div>
        </main>
    );
}
