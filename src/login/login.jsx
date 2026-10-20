import { useNavigate } from 'react-router-dom';

import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';

export function Login({ userName, authState, onAuthChange }) {
    const navigator = useNavigate();

    return (
        <main className="container-fluid bg-secondary text-center">
            <div className="card rounded-3">
                <div className="card-header">
                    <h1>Welcome to StudentAware!</h1>
                </div>

                {authState === AuthState.Authenticated && (
                    <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                        }}
                    />
                )}
            </div>
        </main>
    );
}
