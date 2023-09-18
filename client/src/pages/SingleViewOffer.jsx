import "./styles/SingleViewOffer.css";
import parse from "html-react-parser";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import {
    Bouton,
    ContainerStagium,
    DashbordTitle,
    Label,
    Line,
    WrapperCustomContainer,
} from "./styles/common-styles";
import { getLocalStorageItemInfos, getUserInfos } from "../requetes";
import { useEffect, useState } from "react";
import CardDetailsOffer from "../components/CardDetailsOffer";
const SingleViewOffer = () => {
    const { state } = useLocation();
    const offre = state;
    const navigate = useNavigate();
    const [user, setUser] = useState(getLocalStorageItemInfos("user"));

    useEffect(() => {
        if (user.typeUtilisateur === "étudiant")
            getUserInfos("etudiant", user._id, setUser);
    }, []);

    return (
        <ContainerStagium>
            <Navbar />
            <WrapperCustomContainer
                style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                {user.typeUtilisateur === "étudiant" ? (
                    <DashbordTitle>Offres de stages</DashbordTitle>
                ) : (
                    <DashbordTitle>Gestion des offres</DashbordTitle>
                )}
                <Line>
                    <hr />
                </Line>

                {/* {detailsOffer(user, navigate, offre)} */}
                <CardDetailsOffer user={user} navigate={navigate} offre={offre}/>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

const detailsOffer = (user, navigate, offre) => {
    return (
        <div className="offer-container">
            <div className="offer-top">
                <div className="offer-title"> {offre.titrePoste}</div>
                <div className="offer-company">{offre.nomEntreprise}</div>
                <div className="offer-location">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ color: "#2557a7" }}
                    />
                    {offre.ville}
                </div>
                {/* Bouton Postuler */}
                {user.typeUtilisateur === "étudiant" ? (
                    <>
                        {user.candidatures.includes(offre._id) ? (
                            <div
                                style={{
                                    backgroundColor: "#87f84b",
                                    width: "fit-content",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    marginBottom: "10px",
                                    fontWeight: "bold",
                                    fontSize: "17px",
                                }}
                            >
                                ​Vous avez déjà postulé sur cette offre​
                            </div>
                        ) : (
                            <Bouton
                                style={{ width: "fit-content" }}
                                className="bouton-postuler"
                                onClick={() =>
                                    navigate("/postuler", {
                                        state: { offre },
                                    })
                                }
                            >
                                Postuler
                            </Bouton>
                        )}
                    </>
                ) : (
                    <div className="flag-button">
                        Signalez l'offre
                        <FontAwesomeIcon
                            icon={faFlag}
                            style={{ backgroundColor: "transparent" }}
                        />
                    </div>
                )}
            </div>
            <div className="offer-middle">
                <div>{parse(offre.fonction)}</div>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Label>Frontend technologies :</Label>
                    {parse(offre.frontend)}
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Label>Backend technologies :</Label>
                    {parse(offre.backend)}
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Label>Salaire :</Label>
                    {parse(offre.salaire)}/h
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Label>Langue(s) :</Label>
                    {offre.francais && <>{parse(offre.francais)}</>}
                    {offre.francais && offre.anglais && <>{"/"}</>}
                    {offre.anglais && <>{parse(offre.anglais)}</>}
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Label>Date de début :</Label>
                    {parse(offre.dateDebut)}
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Label>Date de fin :</Label>
                    {parse(offre.dateFin)}
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <Label>Le stage sera :</Label>
                    {parse(offre.lieuStage)}
                </div>
            </div>
        </div>
    );
};

export default SingleViewOffer;
