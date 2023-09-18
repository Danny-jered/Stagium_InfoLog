import "./Employer.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Button, Col, Row, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleXmark,
    faCircleCheck,
    faFileSignature,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    ContainerStagium,
    DashbordTitle,
    Line,
    WrapperCustomContainer,
} from "../pages/styles/common-styles";
import { useState, useEffect } from "react";
import {
    axiosInstance,
    getOffres,
    getLocalStorageItemInfos,
} from "../requetes";

const Candidats = () => {
    const [offres, setOffres] = useState(getLocalStorageItemInfos("offres"));
    const [noData, setNoData] = useState(false);
    const [update, setUpdate] = useState(false);
    const [status, setStatus] = useState();
    const [offreId, setOffreId] = useState("");
    const [userId, setUserId] = useState("");
    const handleDownloadDocument = async (nomFichier, nom, prenom) => {
        try {
            await axiosInstance
                .get(`offres/download/${nomFichier}`, { responseType: "blob" })
                .then((response) => {
                    const url = window.URL.createObjectURL(
                        new Blob([response.data])
                    );
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `${nom}-${prenom}.pdf`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
        } catch (error) {
            console.log(error);
        }
    };
    //Pour message de confirmation
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modifierStatutCandidate = async (typeOperation, offerId, userId) => {
        try {
            await axiosInstance.put(
                `offres/${typeOperation}/${offerId}`,
                { userId },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            setUpdate(true);
            if (typeOperation === "hire-candidat") {
                setStatus("embauche");
            } else if (typeOperation === "accept-candidat/entrevue") {
                setStatus("accepte");
            } else if (typeOperation === "refuse-candidat/entrevue") {
                setStatus("refuse");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const changerStatutRefuser = async (typeOperation, offerId, userID) => {
        await modifierStatutCandidate(typeOperation, offerId, userID);
    };

    const changerStatutAccepter = async (typeOperation, offerId, userID) => {
        window.location = "mailto:yourmail@domain.com";
        setOffreId(offreId);
        setUserId(userID);
        console.log(userID);
        await modifierStatutCandidate(typeOperation, offerId, userID);
    };

    const changeChoisi = async (typeOperation) => {
        await modifierStatutCandidate(typeOperation, offreId, userId);
    };

    useEffect(() => {
        getOffres(setOffres, setNoData);
    }, []);

    useEffect(() => {
        if (update) {
            getOffres(setOffres, setNoData);
            setUpdate(false);
        }
    }, [status, update]);

    return (
        <ContainerStagium>
            <Navbar />
            <DashbordTitle>Candidatures</DashbordTitle>

            <Modal
                show={show}
                onHide={handleClose}
                style={{ background: "rgba(0, 0, 0, 0.5)" }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Voulez-vous vraiment choisir ce candidat?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={function () {
                            changeChoisi("hire-candidat");
                            handleClose();
                        }}
                    >
                        Oui
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Non
                    </Button>
                </Modal.Footer>
            </Modal>

            <Line>
                <hr />
            </Line>
            {Instructions()}
            {offres.length === 0 ? (
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
                            ? "Aucune candidature trouvée"
                            : "Chargement en cours..."}
                    </div>
                </WrapperCustomContainer>
            ) : (
                <WrapperCustomContainer>
                    <Accordion style={{ width: "100%", height: "100%" }}>
                        {offres.map((offer) => (
                            <Accordion.Item
                                key={offer._id}
                                eventKey={offer._id}
                            >
                                <Accordion.Header>
                                    <Col
                                        sm={8}
                                        style={{
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        {offer.nomEntreprise} <br />
                                        {offer.titrePoste} <br />
                                        {offer.ville}, {offer.province}
                                    </Col>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "5px",
                                            alignItems: "center",
                                            fontWeight: "bold",
                                            padding: "5px",
                                            borderRadius: "5px",
                                            color: "black",
                                        }}
                                        sm={3}
                                    >
                                        {offer.candidats.length} candidature(s)
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                    }}
                                >
                                    {offer.candidats.map((candidat) => {
                                        return (
                                            <Row
                                                key={candidat._id}
                                                className={
                                                    candidat.statutOffreEmbauche ===
                                                    "embauché"
                                                        ? "embauche"
                                                        : candidat.statutEntrevue
                                                              .toLowerCase()
                                                              .normalize("NFD")
                                                              .replace(
                                                                  /[\u0300-\u036f]/g,
                                                                  ""
                                                              )
                                                }
                                            >
                                                <Col
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: "500",
                                                        width: "fit-content",
                                                    }}
                                                    sm={1}
                                                >
                                                    Candidat :
                                                </Col>
                                                <Col
                                                    style={{ fontSize: "17px" }}
                                                    sm={2}
                                                >
                                                    {candidat.nom},{" "}
                                                    {candidat.prenom}
                                                </Col>
                                                <Col
                                                    style={{
                                                        fontSize: "17px",
                                                        cursor: "pointer",
                                                        textDecoration:
                                                            "underline",
                                                    }}
                                                    onClick={() =>
                                                        handleDownloadDocument(
                                                            candidat.cv,
                                                            candidat.nom,
                                                            candidat.prenom
                                                        )
                                                    }
                                                    sm={2}
                                                >
                                                    {candidat.cv.length < 1
                                                        ? "Pas de cv"
                                                        : "Cv.pdf"}
                                                </Col>
                                                <Col
                                                    style={{
                                                        fontSize: "17px",
                                                        cursor: "pointer",
                                                        textDecoration:
                                                            "underline",
                                                    }}
                                                    onClick={() =>
                                                        handleDownloadDocument(
                                                            candidat.lettre,
                                                            candidat.nom,
                                                            candidat.prenom
                                                        )
                                                    }
                                                    sm={2}
                                                >
                                                    {candidat.lettre.length < 1
                                                        ? "Pas de lettre"
                                                        : "Lettre.pdf"}
                                                </Col>
                                                {/* <Col
                                                    style={{
                                                        fontSize: "17px",
                                                        textDecoration:
                                                            "underline",
                                                    }}
                                                    sm={2}
                                                >
                                                    Reference.pdf
                                                </Col> */}
                                                <Col
                                                    sm={1}
                                                    className={`${candidat.statutEntrevue
                                                        .toLowerCase()
                                                        .normalize("NFD")
                                                        .replace(
                                                            /[\u0300-\u036f]/g,
                                                            ""
                                                        )}-hide`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCircleCheck}
                                                        color="green"
                                                        style={{
                                                            fontSize: "17px",
                                                            fontWeight: "500",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            changerStatutAccepter(
                                                                "accept-candidat/entrevue",
                                                                offer._id,
                                                                candidat.candidat
                                                            );
                                                            // window.location =
                                                            //     "mailto:yourmail@domain.com";
                                                        }}
                                                        right="30"
                                                    />
                                                </Col>
                                                <Col
                                                    sm={1}
                                                    className={`${candidat.statutEntrevue
                                                        .toLowerCase()
                                                        .normalize("NFD")
                                                        .replace(
                                                            /[\u0300-\u036f]/g,
                                                            ""
                                                        )}-hide`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCircleXmark}
                                                        color="red"
                                                        style={{
                                                            fontSize: "17px",
                                                            cursor: "pointer",
                                                            textDecoration:
                                                                "underline",
                                                        }}
                                                        onClick={() => {
                                                            changerStatutRefuser(
                                                                "refuse-candidat/entrevue",
                                                                offer._id,
                                                                candidat.candidat
                                                            );
                                                        }}
                                                        right="20"
                                                    />
                                                </Col>

                                                <Col
                                                    sm={1}
                                                    className={
                                                        candidat.statutEntrevue ===
                                                        "accepté"
                                                            ? ""
                                                            : "hide"
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faFileSignature}
                                                        color="purple"
                                                        style={{
                                                            fontSize: "25px",
                                                            cursor: "pointer",
                                                            display:
                                                                candidat.statutOffreEmbauche ===
                                                                    "embauché" &&
                                                                "none",
                                                        }}
                                                        onClick={() => {
                                                            setUserId(
                                                                candidat.candidat
                                                            );
                                                            setOffreId(
                                                                offer._id
                                                            );
                                                            handleShow();
                                                        }}
                                                        right="10"
                                                    />
                                                </Col>
                                            </Row>
                                        );
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </WrapperCustomContainer>
            )}
            <Footer />
        </ContainerStagium>
    );
};
const Instructions = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
            }}
        >
            <div style={{ textDecoration: "underline", fontWeight: "bold" }}>
                Instructions :
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <FontAwesomeIcon icon={faCircleCheck} color="green" /> accepter
                le candidat en entrevue &ensp;
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <FontAwesomeIcon icon={faCircleXmark} color="red" /> refuser le
                candidat en entrevue &ensp;
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <FontAwesomeIcon icon={faFileSignature} color="purple" />{" "}
                choisir le candidat après entrevue{" "}
            </div>
        </div>
    );
};
export default Candidats;
