import "./styles/Candidatures.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Bouton,
    ContainerStagium,
    DashbordTitle,
    Line,
    Name,
    WrapperCustomContainer,
} from "./styles/common-styles";
import { useState, useEffect } from "react";
import {
    getUserInfos,
    getLocalStorageItemInfos,
    getCandidatures,
} from "../requetes";
import {
    faCircleXmark,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Label, DocumentContainer, FileInput } from "./styles/account-style.js";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import CardDetailsOffer from "../components/CardDetailsOffer";

const Candidatures = () => {
    const [expanded, setExpanded] = useState(false);
    const [candidatures, setCandidatures] = useState([]);
    const [candidature, setCandidature] = useState(null);
    const [noData, setNoData] = useState(false);
    const [user, setUser] = useState(getLocalStorageItemInfos("user"));
    const [cv, setCv] = useState("");
    const [consult, setConsult] = useState(false);
    const navigate = useNavigate();

    const onClickDetailsOffre = (infoOffre) => {
        setCandidature(infoOffre);
        setConsult(!consult);
    };

    const getInterviewStatus = (status, statutOffreEmbauche) => {
        if (statutOffreEmbauche === "embauché")
            return (
                <div
                    style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        fontWeight: "bold",
                        backgroundColor: "#8ff162",
                        padding: "5px",
                        borderRadius: "5px",
                        color: "black",
                    }}
                >
                    Embauché(e)
                </div>
            );
        if (status === "") {
            return (
                <div
                    style={{
                        fontWeight: "bold",
                        backgroundColor: "#e2e2e2",
                        padding: "5px",
                        borderRadius: "5px",
                    }}
                >
                    Candidature non consultée
                </div>
            );
        } else if (status === "accepté") {
            return (
                <div
                    style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        fontWeight: "bold",
                        backgroundColor: "#8ff162",
                        padding: "5px",
                        borderRadius: "5px",
                        color: "black",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCircleCheck}
                        color="green"
                        style={{
                            backgroundColor: "transparent",
                        }}
                    />
                    Sélectionné(e) pour entrevue
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        fontWeight: "bold",
                        backgroundColor: "#ff7272cc",
                        padding: "5px",
                        borderRadius: "5px",
                        color: "black",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        color="red"
                        style={{
                            backgroundColor: "transparent",
                        }}
                    />
                    Non sélectionné(e) pour entrevue
                </div>
            );
        }
    };

    const getInterviewDetails = (status, statutOffreEmbauche) => {
        if (statutOffreEmbauche === "embauché")
            return "Félicitations! Vous avez été embauché.";
        if (status === "") {
            return "Candidature envoyée";
        } else if (status === "accepté") {
            return "Vous avez été sélectionné pour une entrevue: consultez votre courriel pour plus de détails.";
        } else {
            return "Non sélectionné(e) pour entrevue";
        }
    };
    useEffect(() => {
        getUserInfos("etudiant", user._id, setUser);
    }, []);

    useEffect(() => {
        getCandidatures(setCandidatures, setNoData, user);
    }, [user]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <ContainerStagium>
            <Navbar />
            {consult && (
                <Modal setModal={setConsult} modalValue={consult}>
                    <DashbordTitle>Détails Offres</DashbordTitle>
                    <Line>
                        <hr style={{ marginBottom: "10px" }} />
                    </Line>
                    <div className="details-offer">
                        <CardDetailsOffer
                            user={user}
                            navigate={navigate}
                            offre={candidature}
                        />
                    </div>
                </Modal>
            )}
            <WrapperCustomContainer>
                <DashbordTitle>Candidatures</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                {candidatures.length === 0 ? (
                    <WrapperCustomContainer>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: "80vh",
                                fontWeight: "bold",
                            }}
                        >
                            {noData === true
                                ? "Aucune Candidature"
                                : "Chargement en cours..."}
                        </div>
                    </WrapperCustomContainer>
                ) : (
                    <div className="candidatures-container">
                        {candidatures.map((candidature) => (
                            <Accordion
                                key={candidature._id}
                                expanded={
                                    expanded === `panel${candidature._id}`
                                }
                                onChange={handleChange(
                                    `panel${candidature._id}`
                                )}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${candidature._id}bh-content`}
                                    id={`panel${candidature._id}bh-header`}
                                >
                                    <Typography
                                        sx={{
                                            width: "33%",
                                            flexShrink: 0,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {candidature.nomEntreprise} (
                                        {candidature.titrePoste})
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "gray !important",
                                            fontSize: "15px !important",
                                        }}
                                    >
                                        {candidature.candidats.map((c) => {
                                            if (c.candidat === user._id) {
                                                return getInterviewStatus(
                                                    c.statutEntrevue,
                                                    c.statutOffreEmbauche
                                                );
                                            }
                                        })}
                                    </Typography>
                                </AccordionSummary>
                                {candidature.candidats.map((c) => {
                                    if (c.candidat === user._id) {
                                        return (
                                            <div style={styles.statusContainer}>
                                                <div style={styles.status}>
                                                    <FontAwesomeIcon
                                                        icon={faCircleCheck}
                                                        color="green"
                                                        style={{
                                                            fontSize: "25px",
                                                            backgroundColor:
                                                                "transparent",
                                                        }}
                                                    />
                                                    Envoyée
                                                </div>
                                                <hr />
                                                <div style={styles.status}>
                                                    <FontAwesomeIcon
                                                        icon={faCircleCheck}
                                                        color={
                                                            c.statutEntrevue ===
                                                                "accepté" ||
                                                            c.statutEntrevue ===
                                                                "refusé"
                                                                ? "green"
                                                                : "#dedede"
                                                        }
                                                        style={{
                                                            fontSize: "25px",
                                                            backgroundColor:
                                                                "transparent",
                                                        }}
                                                    />
                                                    {c.statutEntrevue ===
                                                        "accepté" ||
                                                    c.statutEntrevue ===
                                                        "refusé"
                                                        ? "Candidature consultée"
                                                        : "Candidature non consultée"}
                                                </div>
                                                <hr />
                                                {c.statutEntrevue === "" ? (
                                                    <div style={styles.status}>
                                                        <FontAwesomeIcon
                                                            icon={faCircleCheck}
                                                            color={"#dedede"}
                                                            style={{
                                                                fontSize:
                                                                    "25px",
                                                                backgroundColor:
                                                                    "transparent",
                                                            }}
                                                        />
                                                        Statut entrevue
                                                    </div>
                                                ) : (
                                                    <div style={styles.status}>
                                                        {c.statutEntrevue ===
                                                            "accepté" && (
                                                            <>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleCheck
                                                                    }
                                                                    color={
                                                                        "green"
                                                                    }
                                                                    style={{
                                                                        fontSize:
                                                                            "25px",
                                                                        backgroundColor:
                                                                            "transparent",
                                                                    }}
                                                                />
                                                                Sélectionné(e)
                                                                pour entrevue
                                                            </>
                                                        )}
                                                        {c.statutEntrevue ===
                                                            "refusé" && (
                                                            <>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCircleXmark
                                                                    }
                                                                    color={
                                                                        "red"
                                                                    }
                                                                    style={{
                                                                        fontSize:
                                                                            "25px",
                                                                        backgroundColor:
                                                                            "transparent",
                                                                    }}
                                                                />
                                                                Non
                                                                sélectionné(e)
                                                                pour entrevue
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                                <hr />
                                                <div style={styles.status}>
                                                    <FontAwesomeIcon
                                                        icon={faCircleCheck}
                                                        color={
                                                            c.statutOffreEmbauche ===
                                                            "embauché"
                                                                ? "green"
                                                                : "#dedede"
                                                        }
                                                        style={{
                                                            fontSize: "25px",
                                                            backgroundColor:
                                                                "transparent",
                                                        }}
                                                    />
                                                    {c.statutOffreEmbauche
                                                        .length > 1
                                                        ? `${c.statutOffreEmbauche}(e)`
                                                        : "Statut embauche"}
                                                </div>
                                            </div>
                                        );
                                    }
                                })}

                                <AccordionDetails>
                                    <Bouton
                                        style={{
                                            width: "fit-content",
                                            fontSize: "17px",
                                            marginBottom: "10px",
                                            marginTop: "10px",
                                        }}
                                        onClick={() =>
                                            onClickDetailsOffre(candidature)
                                        }
                                    >
                                        Détails offre
                                    </Bouton>
                                    {candidature.candidats.map((c) => {
                                        if (
                                            c.candidat === user._id &&
                                            c.statutEntrevue === ""
                                        ) {
                                            return (
                                                <DocumentContainer>
                                                    <Label
                                                        style={{
                                                            fontWeight: "bold",
                                                            cursor: "pointer",
                                                        }}
                                                        htmlFor="cv"
                                                    >
                                                        Modifier votre CV :
                                                    </Label>
                                                    <FileInput
                                                        type="file"
                                                        id="cv"
                                                        name="cv"
                                                        placeholder="Ajouter votre cv ici...!"
                                                        onChange={(e) =>
                                                            setCv(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                    />
                                                </DocumentContainer>
                                            );
                                        }
                                    })}
                                    <div className="info-entrevue-container">
                                        <Name style={{ fontWeight: "bold" }}>
                                            Informations sur votre candidature :
                                        </Name>
                                        <Typography>
                                            {candidature.candidats.map((c) => {
                                                if (c.candidat === user._id) {
                                                    return getInterviewDetails(
                                                        c.statutEntrevue,
                                                        c.statutOffreEmbauche
                                                    );
                                                }
                                            })}
                                        </Typography>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                )}
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

const styles = {
    statusbar: {
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "black",
        fontWeight: "bold",
    },
    statusContainer: {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        alignItems: "center",
        marginTop: "20px",
    },
    status: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        fontWeight: "500",
    },
};

export default Candidatures;
