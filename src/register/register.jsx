import React from 'react';
import { useNavigate } from "react-router-dom";

import { RegisterForm } from "../components/register/registerForm";
import { AuthState } from "../login/authState";

export function Register({userName, authState, onAuthChange}) {
    const navigator = useNavigate();

    React.useEffect(() => {
        if (authState === AuthState.Authenticated) {
            navigator('/', {replace: true});
        }
    }, [authState, navigator]);

    return (
        <main className="container-fluid bg-secondary text-center">
            <RegisterForm
                userName={userName}
                onRegistration={(registerUserName) => onAuthChange(registerUserName, AuthState.Authenticated)}
            />
        </main>
    );
}