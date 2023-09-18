import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Bouton, Label } from "../pages/styles/common-styles";
const CardDetailsOffer = ({user, navigate, offre}) => {
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

export default CardDetailsOffer;
