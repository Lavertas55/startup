import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';

function Header() {
    return (
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
                <div className="fluid-container header-container">
                    <a className="navbar-brand" href="#">StudentAware</a>
                </div>

                <div className="fluid-container">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link active" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="register.html">Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="courses.html">Courses</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="students.html">Students</a>
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
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}