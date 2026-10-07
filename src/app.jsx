import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import './styles/tables.css';
import './styles/forms.css';
import { BrowserRouter, NavLink, Route, Routes, Link } from 'react-router-dom';
import { Login } from './login/login';
import { Register } from './register/register';
import { Courses } from './courses/courses';
import { Course } from './courses/course';
import { Students } from './students/students';
import { Student } from './students/student';
import { AddStudent } from './students/add-student';
import { Contact } from './students/contact';

function Header() {
    return (
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
                <div className="fluid-container header-container">
                    <Link className="navbar-brand" to="/">StudentAware</Link>
                </div>

                <div className="fluid-container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/courses">Courses</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/students">Students</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

function Footer() {
    return (
        <footer className="bg-dark fixed-bottom text-white-50">
            <span className="text-reset">Collin Mickelson</span>
            <a className="text-reset" href="https://github.com/lavertas55/startup">GitHub</a>
        </footer>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <Header />
                
                <Routes>
                    <Route path="/" element={<Login />} exact />
                    <Route path="/register" element={<Register />} />

                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:courseId" element={<Course />} />
                    
                    <Route path="/students" element={<Students />} />
                    <Route path="/add-student" element={<AddStudent />} />
                    <Route path="/student/:studentId" element={<Student />} />
                    <Route path="/contact/:contactId" element={<Contact />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}