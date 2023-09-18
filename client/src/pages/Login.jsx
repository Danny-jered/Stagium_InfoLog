import "./styles/Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { axiosInstance, setLocalStorageItemInfos } from "../requetes.js";
import Footer from "../components/Footer";
import { WrapperCustomContainer } from "./styles/common-styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);

    const handleConnectButton = async () => {
        if (code.length === 0) return;
        setLoad(true);
        try {
            const userData = await axiosInstance.post("auths/login", {
                code,
                password,
            });

            if (userData) {
                const user = userData.data;
                setLocalStorageItemInfos("user", user);
                setLocalStorageItemInfos("offres", []);
                setTimeout(() => {
                    if (user.typeUtilisateur === "admin") {
                        navigate("/admin");
                    } else if (user.typeUtilisateur === "étudiant") {
                        setLocalStorageItemInfos("candidatures", []);
                        navigate("/etudiant");
                    } else if (user.typeUtilisateur === "employeur") {
                        navigate("/employeur");
                    } else {
                        navigate("/agent");
                    }
                }, 2000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container-login">
            <WrapperCustomContainer
                style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="border-login">
                    <h1
                        className="logo"
                        style={{ backgroundColor: "transparent" }}
                    >
                        Stagium InfoLog
                    </h1>
                    <hr />
                    <h3
                        className="title"
                        style={{ backgroundColor: "transparent" }}
                    >
                        Accéder à votre compte
                    </h3>
                    <div
                        className="infos-login"
                        style={{ backgroundColor: "transparent" }}
                    >
                        <div
                            className="label-container"
                            style={{ backgroundColor: "transparent" }}
                        >
                            Code permanent * :
                        </div>
                        <div
                            className="input-container"
                            style={{ backgroundColor: "transparent" }}
                        >
                            <div
                                className="input-container-wrapprer"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    style={{
                                        color: "#2557a7",
                                        backgroundColor: "transparent",
                                    }}
                                />
                                <input
                                    type="text"
                                    placeholder="Entrez votre code permanent ..."
                                    className="student-code"
                                    style={{ backgroundColor: "transparent" }}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <div
                            className="label-container"
                            style={{ backgroundColor: "transparent" }}
                        >
                            Mot de passe * :
                        </div>
                        <div
                            className="input-container"
                            style={{ backgroundColor: "transparent" }}
                        >
                            <div
                                className="input-container-wrapprer"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <FontAwesomeIcon
                                    icon={faLock}
                                    style={{
                                        color: "#2557a7",
                                        backgroundColor: "transparent",
                                    }}
                                />
                                <input
                                    type="password"
                                    placeholder="Entrez votre mot de passe ..."
                                    className="student-password"
                                    style={{ backgroundColor: "transparent" }}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {load === true ? (
                        <div className="connect-button-load">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div
                            className="connect-button"
                            onClick={handleConnectButton}
                        >
                            Connexion
                        </div>
                    )}
                </div>
            </WrapperCustomContainer>
            <Footer />
        </div>
    );
};

export default Login;
