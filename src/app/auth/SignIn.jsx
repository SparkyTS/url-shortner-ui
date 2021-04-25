import React from "react";

export  default function SignIn({handleChange, onLogin}){

    return(
        <form className="form sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <i className="fas fa-user"/>
                <input onChange={handleChange} name={"username"} type="text" placeholder="Username / Email"/>
            </div>
            <div className="input-field">
                <i className="fas fa-lock"/>
                <input onChange={handleChange} name={"password"} type="password" placeholder="Password" onKeyUp={e => e.keyCode === 13 ? onLogin() : null}/>
            </div>
            <input onClick={onLogin} type="button" value="Login" className="auth-btn solid"/>
        </form>
    );
}