import React from 'react';

import { ContactInfo } from "../components/contacts/contactInfo";
import { EditContactForm } from "../components/contacts/editContactForm";

export function Contact() {
    const [formVisible, setFormVisible] = React.useState(false);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div>
                {!formVisible && (
                    <ContactInfo onToggle={setFormVisible} />
                )}

                {formVisible && (
                    <EditContactForm onToggle={setFormVisible} />
                )}
            </div>
        </main>
    );
}
