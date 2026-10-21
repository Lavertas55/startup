import { useNavigate } from 'react-router-dom';

import { NavLink, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { AuthState } from "../../login/authState";

export function Header(props) {
    const navigate = useNavigate();

    async function onLogout(onAuthChange) {
        onAuthChange('', AuthState.Unauthenticated);
        navigate('/');
    }

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
                        {props.authState === AuthState.Unauthenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Register</NavLink>
                            </li>
                        )}
                        {props.authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/courses">Courses</NavLink>
                            </li>
                        )}
                        {props.authState === AuthState.Authenticated && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/students">Students</NavLink>
                            </li>
                        )}
                    </ul>
                </div>

            </nav>

            {props.authState === AuthState.Authenticated && (
                <Button variant='danger' id='logout' onClick={() => onLogout(props.onAuthChange)}>Logout</Button>
            )}
        </header>
    );
}