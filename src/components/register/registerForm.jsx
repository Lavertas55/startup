import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import { loginOrRegister } from '../../utils/login-register';

export function RegisterForm({userName, onRegistration, onError}) {
    const [registerUserName, setUserName] = React.useState(userName);
    const [password, setPassword] = React.useState('');
    const [verifyPassword, setVerifyPassword] = React.useState('');
    const [verifyPasswordTouched, setVerifyPasswordTouched] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const navigator = useNavigate();

    const onSuccess = (userName) => {
        onRegistration(userName);
        setSuccess(true);
    }

    async function submitForm(event) {
        event.preventDefault();
        loginOrRegister(
            `/api/auth/register`,
            registerUserName,
            password,
            onSuccess,
            onError
        );

        if (success) {
            navigator("/");
        }
    }

    return (
        <div className="card rounded-3">
            <div className="card-header">
                <h1>Register</h1>
            </div>
            <div className="card-body">
                <form onSubmit={submitForm}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">👤</span>
                        <input 
                            className="form-control"
                            type="text"
                            placeholder="username"
                            value={registerUserName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">🔒</span>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">🔒</span>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="re-enter password"
                            onChange={(e) => {
                                setVerifyPassword(e.target.value);
                                setVerifyPasswordTouched(true);
                            }}
                        />
                    </div>

                    {verifyPasswordTouched && verifyPassword !== password && (
                        <div className="alert alert-warning">Password does not match</div>
                    )}
        
                    <Button
                        variant='primary'
                        type="submit"
                        disabled={!registerUserName || !password || !verifyPassword || verifyPassword !== password}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </div>
    )
}
