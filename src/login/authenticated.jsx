import React from 'react';

export function Authenticated({ userName }) {    
    return (
        <div className='card-body'>
            <span>{userName}</span>
        </div>
    );
}