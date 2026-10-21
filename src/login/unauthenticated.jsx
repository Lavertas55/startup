import React from 'react';

import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }
    
    return (
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

            <Button variant="primary" onClick={() => loginUser()} disabled={!userName || !password}>
                Login
            </Button>
        </div>
    );
}