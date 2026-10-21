import React from 'react';

const repeatedCourse = {
    code: 'CS 111',
    name: 'Introduction to Computer Science',
};

const repeatedStudent = {
    name: 'Cosmo Cougar',
    courseIds: ['cs111'],
};

const repeatedContact = {
    studentId: 'ccougar',
    timestamp: '2026-09-15T17:34',
    instructor: 'Shane Reese',
    method: 'Email',
    success: true,
    notes: 'Cosmo is behind on his homework. We discussed the late policy and worked to establish a plan to remember his assignments. We will talk again in one week.',
};

const repeatedReminder = {
    studentId: 'ccougar',
    timestamp: '2026-09-15T17:34',
}

let state = {
    courses: [{ id: 'cs111', ...repeatedCourse }],
    students: [{ id: 'ccougar', ...repeatedStudent }],
    contacts: [{ id: '1', ...repeatedContact }],
    reminders: [{ id: '1', ...repeatedReminder }],
};

const listeners = new Set();

function notify() {
    listeners.forEach((listener) => listener());
}

function appendRecord(collection, record) {
    state = { ...state, [collection]: [...state[collection], record] };
    notify();
}

function deleteRecord(collection, recordId) {
    const index = state[collection].findIndex(record => record.id === recordId);
    if (index > -1) {
        state[collection].splice(index, 1);
        notify();
    }
}

const repeatedRecords = [
    { collection: 'courses', template: repeatedCourse, idPrefix: 'cs111-repeat' },
    { collection: 'students', template: repeatedStudent, idPrefix: 'ccougar-repeat' },
    { collection: 'contacts', template: repeatedContact, idPrefix: '1-repeat' },
    { collection: 'reminders', template: repeatedReminder, idPrefix: '1-repeat' },
];
let nextRecordIndex = 0;

function addRepeatedRecord() {
    for (let checked = 0; checked < repeatedRecords.length; checked += 1) {
        const repeatedRecord = repeatedRecords[nextRecordIndex];
        nextRecordIndex = (nextRecordIndex + 1) % repeatedRecords.length;

        if (state[repeatedRecord.collection].length >= 5) continue;

        const copyNumber = state[repeatedRecord.collection].length + 1;
        appendRecord(repeatedRecord.collection, {
            id: `${repeatedRecord.idPrefix}-${copyNumber}`,
            ...repeatedRecord.template,
        });
        if (Object.values(state).every((records) => records.length >= 5)) {
            clearInterval(feedInterval);
        }
        return;
    }

    clearInterval(feedInterval);
}

// Add one repeated record every two seconds, cycling across the three lists
// until each contains five records total (including its initial record).
const feedInterval = typeof window === 'undefined'
    ? null
    : setInterval(addRepeatedRecord, 2000);

function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function getSnapshot() {
    return state;
}

export function useRealtimeData() {
    return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function addCourse(course) {
    appendRecord('courses', course);
}

export function addStudent(student) {
    appendRecord('students', student);
}

export function addContact(contact) {
    appendRecord('contacts', contact);
}

export function updateContact(contact) {
    state = {
        ...state,
        contacts: state.contacts.map((currentContact) =>
            currentContact.id === contact.id ? { ...currentContact, ...contact } : currentContact
        ),
    };
    notify();
}

export function addReminder(reminder) {
    appendRecord('reminders', reminder);
}

export function removeReminder(reminderId) {
    deleteRecord('reminders', reminderId);
}
