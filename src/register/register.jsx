import React from 'react';

export function Register() {
    return (
        <main className="container-fluid bg-secondary text-center">
            <div className="card rounded-3">
                <div className="card-header">
                    <h1>Register</h1>
                </div>
                <div className="card-body">
                    <form method="get" action="courses.html">
                        <div className="input-group mb-3">
                            <span className="input-group-text">@</span>
                            <input className="form-control" type="email" placeholder="you@example.com" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">🔒</span>
                            <input className="form-control" type="password" placeholder="password" />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">🔒</span>
                            <input className="form-control" type="password" placeholder="re-enter password" />
                        </div>
            
                        <button className="btn btn-primary" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </main>
    );
}