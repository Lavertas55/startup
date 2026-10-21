import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export function RegisterForm() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [verifyPassword, setVerifyPassword] = React.useState('');
    const [verifyPasswordTouched, setVerifyPasswordTouched] = React.useState(false);

    const navigator = useNavigate();

    async function submitForm(event) {
        event.preventDefault();
        navigator("/courses");
    }

    return (
        <div className="card rounded-3">
            <div className="card-header">
                <h1>Register</h1>
            </div>
            <div className="card-body">
                <form onSubmit={submitForm}>
                    <div className="input-group mb-3">
                        <span className="input-group-text">@</span>
                        <input 
                            className="form-control"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        disabled={!email || !password || !verifyPassword || verifyPassword !== password}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </div>
    )
}
