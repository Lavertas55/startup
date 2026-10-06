import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import './styles/tables.css';
import './styles/forms.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Register } from './register/register';

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
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}