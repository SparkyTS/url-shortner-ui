import React from 'react'

export default function SignUp({handleChange, onSignUp}) {

    return (
        <div className="form sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
                <i className="fas fa-font"/>
                <input onChange={handleChange} type="text" name="name" placeholder="Name"/>
            </div>
            <div className="input-field">
                <i className="fas fa-user"/>
                <input onChange={handleChange} type="text" name="username" placeholder="Username"/>
            </div>
            <div className="input-field">
                <i className="fas fa-envelope"/>
                <input onChange={handleChange} type="email" name="email" placeholder="Email"/>
            </div>
            <div className="input-field">
                <i className="fas fa-lock"/>
                <input onChange={handleChange} type="password" name="password" placeholder="Password" onKeyUp={e => e.keyCode === 13 ? onSignUp() : null}/>
            </div>
            <input onClick={onSignUp} type="button" className="auth-btn" value="Sign up"/>
        </div>
    );
}