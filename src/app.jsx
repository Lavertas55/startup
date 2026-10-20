import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import './styles/tables.css';
import './styles/forms.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from './components/main/header';
import { Footer } from './components/main/footer';
import { NotFound } from './components/shared/notFound';

import { AuthState } from './login/authState';
import { Login } from './login/login';
import { Register } from './register/register';
import { Courses } from './courses/courses';
import { Course } from './courses/course';
import { Students } from './students/students';
import { Student } from './students/student';
import { Contact } from './students/contact';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    function onAuthChange(userName, authState) {
        setAuthState(authState);
        setUserName(userName);
    }

    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <Header authState={ authState } onAuthChange= { onAuthChange } />
                
                <Routes>
                    <Route path="/" element={
                        <Login
                            userName={userName}
                            authState={authState}
                            onAuthChange={onAuthChange}
                        />
                    } />
                    <Route path="/register" element={<Register />} />

                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:courseId" element={<Course />} />
                    
                    <Route path="/students" element={<Students />} />
                    <Route path="/student/:studentId" element={<Student />} />
                    <Route path="/contact/:contactId" element={<Contact />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}