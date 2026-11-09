import React from 'react';

import { ContactInfo } from "../components/contacts/contactInfo";
import { EditContactForm } from "../components/contacts/editContactForm";
import { useParams } from 'react-router-dom';
import { apiFetch } from '../utils/api-fetch';
import { MessageDialog } from '../components/shared/messageDialog';

export function Contact() {
    const [formVisible, setFormVisible] = React.useState(false);
    const { contactId } = useParams();
    const [contact, setContact] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        apiFetch(`/api/contact/${encodeURIComponent(contactId)}`)
            .then(async (response) => {
                if (!response.ok) throw new Error((await response.json()).msg || 'Failed to load contact.');
                setContact(await response.json());
            })
            .catch((err) => setError(`⚠ Error: ${err.message}`));
    }, [contactId]);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                {!formVisible && contact && <ContactInfo contact={contact} onToggle={setFormVisible} />}

                {formVisible && contact && <EditContactForm contact={contact} onToggle={setFormVisible} onSaved={setContact} onError={setError} />}
                {!contact && <p className="alert alert-warning">Contact not found.</p>}
            </div>
            <MessageDialog message={error} onHide={() => setError(null)} />
        </main>
    );
}
