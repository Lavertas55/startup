import React from 'react';

export function Register() {
    return (
        <main class="container-fluid bg-secondary text-center">
            <div class="card rounded-3">
                <div class="card-header">
                    <h1>Register</h1>
                </div>
                <div class="card-body">
                    <form method="get" action="courses.html">
                        <div class="input-group mb-3">
                            <span class="input-group-text">@</span>
                        <input class="form-control" type="email" placeholder="you@example.com" />
                    </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">🔒</span>
                            <input class="form-control" type="password" placeholder="password" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">🔒</span>
                            <input class="form-control" type="password" placeholder="re-enter password" />
                        </div>
            
                        <button class="btn btn-primary" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </main>
    );
}