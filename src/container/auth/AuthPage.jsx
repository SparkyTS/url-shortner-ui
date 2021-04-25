import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import {toastErrorMessage, toastInfoMessage} from "../../shared/components/ToastMessage";
import {signInUser, signUpUser} from "../../api/AuthApi";
import {setTokenCookies} from "../../shared/utils/tokenHandler";
import {getCurrentUser, hasUniqueEmail, hasUniqueName} from "../../api/UserApi";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../../redux/user/UserAction";

const initialValues = {
    name: '',
    username: '',
    email: '',
    password: ''
}
export default function AuthPage() {
    const [isSignUp, setIsSignUp] = React.useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({
        ...initialValues
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const toggle = () => {
        setIsSignUp(prev => !prev);
        setFormData(initialValues);
    }

    let handleLoginSignUpResponse = async function (res) {
        if (res.success)
            setTokenCookies(res.data);
        const user = await getCurrentUser();
        if (user.success) {
            dispatch(setCurrentUser(user.data));
            toastInfoMessage(`Hello ${user.data.name}, Welcome to our shorten URL service`);
        }
    };

    const onLogin =async () => {
        const {username, password} = formData;
        if(!username){
            toastErrorMessage("Please enter username / email ");
        } else if (!password) {
            toastErrorMessage("Please enter valid password")
        } else {
            const res = await signInUser(username, password);
            await handleLoginSignUpResponse(res);
        }
    }

    const onSignUp = async () => {
        const {name, username, email, password} = formData;
        //TODO: add regex validation
        if(!username){
            toastErrorMessage("Please enter a valid username");
        } else if (!email) {
            toastErrorMessage("Please enter a valid email");
        }
        else if (!password) {
            toastErrorMessage("Please enter a valid password");
        } else {
            const res = await Promise.all([hasUniqueEmail(email), hasUniqueName(username)]);
            //if username and email both are unique sign up the user
            if(res[0].success && res[1].success){
                const res = await signUpUser(name, username, email, password);
                await handleLoginSignUpResponse(res);
            }
        }
    }

    return (
        <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
            <div className="forms-container">
                <div className="signin-signup">
                    <Login handleChange={handleChange} onLogin={onLogin}/>
                    <SignUp handleChange={handleChange} onSignUp={onSignUp}/>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            Sign up and generate unlimited shorter url and also you can manage the urls easily.
                        </p>
                        <button className="btn transparent" id="sign-up-btn" onClick={toggle}>
                            Sign up
                        </button>
                    </div>
                    <img src={require('../../shared/img/login.svg').default} className="image" alt=""/>
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            If you already have account go ahead and sing in to manage all your shortened urls.
                        </p>
                        <button className="btn transparent" id="sign-in-btn" onClick={toggle}>
                            Sign in
                        </button>
                    </div>
                    <img src={require('../../shared/img/register.svg').default} className="image" alt=""/>
                </div>
            </div>
        </div>
    );
}

