import React from 'react';

export function Login() {
    return (
        <main className="container-fluid bg-secondary text-center">
            <div className="card rounded-3">
                <div className="card-header">
                    <h1>Welcome to StudentAware!</h1>
                </div>

                <div className="card-body">
                    <form method="get" action="/courses">
                        <div className="input-group mb-3">
                            <span className="input-group-text">@</span>
                            <input className="form-control" type="email" placeholder="you@example.com" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">🔒</span>
                            <input className="form-control" type="password" placeholder="password" />
                        </div>
            
                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </main>
    );
}
