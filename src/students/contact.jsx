import React from 'react';

import { ContactInfo } from "../components/contacts/contactInfo";
import { EditContactForm } from "../components/contacts/editContactForm";
import { useParams } from 'react-router-dom';
import { useRealtimeData } from '../services/realtimeData';

export function Contact() {
    const [formVisible, setFormVisible] = React.useState(false);
    const { contactId } = useParams();
    const { contacts } = useRealtimeData();
    const contact = contacts.find((item) => item.id === contactId);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                {!formVisible && contact && <ContactInfo contact={contact} onToggle={setFormVisible} />}

                {formVisible && contact && <EditContactForm contact={contact} onToggle={setFormVisible} />}
                {!contact && <p className="alert alert-warning">Contact not found.</p>}
            </div>
        </main>
    );
}
