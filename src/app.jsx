import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

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
                            <a className="nav-link active" href="index.html">Home</a>
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
        <body className="bg-dark text-light">
            <Header />
            
            <Footer />
        </body>
    );
}