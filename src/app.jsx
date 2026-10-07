import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';
import './styles/tables.css';
import './styles/forms.css';
import { BrowserRouter, NavLink, Route, Routes, Link, useNavigate } from 'react-router-dom';
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
                            <NavLink className="nav-link" to="/">Home</NavLink>
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

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const goBackTimer = setTimeout(() => {
                navigate(-1);
        }, 3000)

        return () => clearTimeout(goBackTimer);
    }, []);

    return (
        <main className="container-fluid bg-secondary text-center">
            <div className="card rounded-3">
                <div className="card-header">
                    <h1>Oops... (404)</h1>
                </div>

                <div className="cardbody p-3">
                    <p>The page you are looking for doesn't exist.</p>
                    <p>Don't worry we'll take you back in 3 seconds.</p>
                </div>
            </div>
        </main>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <Header />
                
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:courseId" element={<Course />} />
                    
                    <Route path="/students" element={<Students />} />
                    <Route path="/add-student" element={<AddStudent />} />
                    <Route path="/student/:studentId" element={<Student />} />
                    <Route path="/contact/:contactId" element={<Contact />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}