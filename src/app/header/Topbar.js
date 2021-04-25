import React from "react";
import {Link, useHistory} from "react-router-dom";
import {removeTokenCookies} from "../../shared/utils/tokenHandler";
import {useSelector} from "react-redux";

const Topbar = () => {

    const history = useHistory();

    const userName = useSelector(({user}) => user.currentUser.name);

    const logout = () => {
        removeTokenCookies();
        history.push('/auth');
    }

    return(
        <div className="topbar">
            <div className="topbar__left">
                <div className="topbar_logo_left">
                    <Link className="topbar__logo" to="/">
                        {/*URL SHORTNER*/}
                        <img src={require("./../../shared/img/logo_url_shortner.png").default} className="image" alt=""/>
                    </Link>
                </div>
            </div>

            <div className="topbar__right">
                <p className="m-auto">
                    Hello, {userName}
                </p>
                <button
                    className="topbar__btn"
                    type="button"
                    onClick={logout}
                >
                    <i className="fa fa-power-off m-auto p-3" aria-hidden="true"/>
                </button>
            </div>
        </div>
    )
}

export default Topbar;