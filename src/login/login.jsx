import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';
import { useLocation, useNavigate } from 'react-router-dom';

export function Login({ userName, authState, onAuthChange }) {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <main className="container-fluid bg-secondary text-center">
            <div className="card rounded-3">
                <div className="card-header">
                    <h1>Welcome to StudentAware!</h1>
                </div>

                {authState === AuthState.Authenticated && (
                    <Authenticated userName={userName} />
                )}
                {authState === AuthState.Unauthenticated && (
                    <Unauthenticated
                        userName={userName}
                        onLogin={(loginUserName) => {
                            onAuthChange(loginUserName, AuthState.Authenticated);
                            const destination = location.state?.from;
                            navigate(destination ? `${destination.pathname}${destination.search || ''}${destination.hash || ''}` : '/courses', { replace: true });
                        }}
                    />
                )}
            </div>
        </main>
    );
}
