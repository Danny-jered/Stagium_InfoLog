import "./styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getLocalStorageItemInfos } from "../requetes.js";
const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    // Run one time on load
    useEffect(() => {
        setUser(getLocalStorageItemInfos("user"));
    }, []);

    const handlerLogoButton = () => {
        if (user.typeUtilisateur === "agent") {
            navigate("/agent");
        } else if (user.typeUtilisateur === "employeur") {
            navigate("/employeur");
        } else if (user.typeUtilisateur === "étudiant") {
            navigate("/etudiant");
        } else {
            navigate("/admin");
        }
    };

    const handlerLogoutButton = () => {
        window.localStorage.clear();
        navigate("/");
    };
    return (
        <div className="navbar-container">
            <div className="wrapprer">
                <div className="logo-container" onClick={handlerLogoButton}>
                    Accueil
                </div>
                <div className="option-container">
                    <div
                        className="logout-button"
                        onClick={handlerLogoutButton}
                    >
                        Se déconnecter
                    </div>
                    <Link
                        to={`/account/${user._id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <div className="account-details">Mon compte</div>
                    </Link>

                    {/* for mobile */}
                    <div
                        className="mobile-logout-button"
                        onClick={handlerLogoutButton}
                    >
                        <FontAwesomeIcon
                            icon={faRightFromBracket}
                            style={{ backgroundColor: "transparent" }}
                        />
                    </div>

                    <Link
                        to="/account/david"
                        state={{ user }}
                        style={{ textDecoration: "none" }}
                    >
                        <div className="mobile-account-details">
                            <FontAwesomeIcon
                                icon={faUser}
                                style={{ backgroundColor: "transparent" }}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
