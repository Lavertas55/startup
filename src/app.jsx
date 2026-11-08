import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import './styles/tables.css';
import './styles/forms.css';

import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

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
    return <BrowserRouter><AppRoutes /></BrowserRouter>;
}

function AppRoutes() {
    const navigate = useNavigate();
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const [authState, setAuthState] = React.useState(userName ? AuthState.Unknown : AuthState.Unauthenticated);
    const location = useLocation();

    React.useEffect(() => {
        if (!userName) return;
        let active = true;
        fetch('/api/auth/validate')
            .then((response) => {
                if (!active) return;
                if (response.status === 401) {
                    localStorage.removeItem('userName');
                    setUserName('');
                    setAuthState(AuthState.Unauthenticated);
                } else if (response.ok) {
                    setAuthState(AuthState.Authenticated);
                }
            })
            .catch(() => {
                if (active) setAuthState(AuthState.Authenticated);
            });
        return () => { active = false; };
    }, []);

    React.useEffect(() => {
        const onUnauthorized = () => {
            localStorage.removeItem('userName');
            setUserName('');
            setAuthState(AuthState.Unauthenticated);
            navigate('/', { state: { from: location }, replace: true });
        };
        window.addEventListener('auth:unauthorized', onUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', onUnauthorized);
    }, [navigate, location]);

    function onAuthChange(userName, authState) {
        setAuthState(authState);
        setUserName(userName);
        if (userName === '') {
            localStorage.removeItem('userName');
        }
        else {
            localStorage.setItem('userName', userName);
        }
    }

    return (
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
                    <Route path="/register" element={
                        <Register
                            userName={userName}
                            authState={authState}
                            onAuthChange={onAuthChange}    
                        />
                    } />

                    <Route path="/courses" element={<Protected authState={authState}><Courses /></Protected>} />
                    <Route path="/course/:courseId" element={<Protected authState={authState}><Course /></Protected>} />
                    
                    <Route path="/students" element={<Protected authState={authState}><Students /></Protected>} />
                    <Route path="/student/:studentId" element={<Protected authState={authState}><Student /></Protected>} />
                    <Route path="/contact/:contactId" element={<Protected authState={authState}><Contact /></Protected>} />

                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
    );
}

function Protected({ authState, children }) {
    const location = useLocation();
    if (authState === AuthState.Unknown) return null;
    if (authState !== AuthState.Authenticated) return <Navigate to="/" replace state={{ from: location }} />;
    return children;
}
