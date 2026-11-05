import React from 'react';
import { useNavigate } from "react-router-dom";

import { RegisterForm } from "../components/register/registerForm";
import { AuthState } from "../login/authState";
import { loginOrRegister } from "../utils/login-register";
import { MessageDialog } from '../components/shared/messageDialog';

export function Register({userName, authState, onAuthChange}) {
    const [displayError, setDisplayError] = React.useState(null);
    
    const navigator = useNavigate();

    React.useEffect(() => {
        if (authState === AuthState.Authenticated) {
            navigator('/', {replace: true});
        }
    }, [authState, navigator]);

    return (
        <>
            <main className="container-fluid bg-secondary text-center">
                <RegisterForm
                    userName={userName}
                    onRegistration={(registerUserName) => onAuthChange(registerUserName, AuthState.Authenticated)}
                    onError={setDisplayError}
                />
            </main>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}