import React from 'react';

import Button from 'react-bootstrap/Button';

import { loginUser } from './utils';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);
    
    const submit = () => {
        loginUser(userName, password, props.onLogin, setDisplayError);
    }

    return (
        <>
            <div className="card-body">
                <div className="input-group mb-3">
                    <span className="input-group-text">👤</span>
                    <input 
                        className="form-control"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="username"
                    />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">🔒</span>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                    />
                </div>

                <Button variant="primary" onClick={() => submit()} disabled={!userName || !password}>
                    Login
                </Button>
            </div>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}