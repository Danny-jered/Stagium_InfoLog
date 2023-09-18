import "./Employer.css";
import parse from "html-react-parser";
import { Row, Col, ListGroup, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPen,
    faTrash,
    faCircleCheck,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    Bouton,
    ContainerStagium,
    DashbordTitle,
    Line,
    WrapperCustomContainer,
    BoutonSupprimer,
    Label,
} from "../pages/styles/common-styles";
import Snackbar from "@mui/material/Snackbar";

import {
    deleteItem,
    getOffres,
    getLocalStorageItemInfos,
} from "../requetes.js";
import { useEffect, useState } from "react";
import ModalPopup from "../components/Modal/ModalPopup";

const ListeOffre = () => {
    const navigate = useNavigate();
    const [noData, setNoData] = useState(false);
    const [update, setUpdate] = useState(false);
    const [offres, setOffres] = useState(getLocalStorageItemInfos("offres"));
    const [open, setOpen] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [deleteOffer, setDeleteOffer] = useState(false);
    const [offerToDelete, setOfferToDelete] = useState(null);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    useEffect(() => {
        getOffres(setOffres, setNoData);
    }, []);
    useEffect(() => {
        if (update) {
            getOffres(setOffres, setNoData);
            setUpdate(false);
        }
    }, [update]);

    useEffect(() => {
        if (deleteOffer) {
            deleteItem("offres", offerToDelete, setUpdate);
            handleClick();
        }
    }, [deleteOffer]);

    const handleDeleteOfferButton = (id) => {
        setOfferToDelete(id);
        setOnDelete(!onDelete);
    };

    return (
        <ContainerStagium>
            {onDelete && (
                <ModalPopup
                    setModal={setOnDelete}
                    modalValue={onDelete}
                    setResponse={setDeleteOffer}
                />
            )}
            <Navbar />
            <WrapperCustomContainer style={{ marginBottom: "10px" }}>
                <DashbordTitle>Offres de stages</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                <div className="boutons-employeur">
                    <Bouton
                        style={{ width: "300px" }}
                        onClick={() => navigate("/add-offer")}
                    >
                        Déposer une offre de stage
                    </Bouton>
                    {offres.length !== 0 && (
                        <>
                            <Bouton
                                style={{ width: "300px" }}
                                onClick={() => navigate("/candidats")}
                            >
                                Voir les candidats
                            </Bouton>
                            <BoutonSupprimer
                                style={{ width: "300px" }}
                                onClick={() =>
                                    console.log("supprimer toutes les offres")
                                }
                            >
                                Supprimer toutes les offres
                            </BoutonSupprimer>
                        </>
                    )}
                </div>
                {offres.length === 0 || update ? (
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
                                ? "Aucune offre trouvée"
                                : "Chargement en cours..."}
                        </div>
                    </WrapperCustomContainer>
                ) : (
                    <>
                        <Tab.Container
                            id="list-group-tabs-example"
                            defaultActiveKey={`#${offres[0]._id}`}
                        >
                            <Row className="row-custom">
                                <Col sm={4} className="colonne-container-1">
                                    <div className="colonne">
                                        <ListGroup>
                                            {offres.map((offer) => (
                                                <ListGroup.Item
                                                    className="custom-color"
                                                    key={offer._id}
                                                    action
                                                    href={`#${offer._id}`}
                                                >
                                                    {offer.nomEntreprise} <br />
                                                    {offer.titrePoste} <br />
                                                    {capitalizeFirstLetter(
                                                        offer.ville
                                                    )}
                                                    , {offer.province}
                                                    <FontAwesomeIcon
                                                        icon={faPen}
                                                        className="iconPen"
                                                        border
                                                        style={{
                                                            color: "#2557a7",
                                                            marginRight: "5px",
                                                        }}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="iconTrash"
                                                        style={{
                                                            color: "rgb(245, 52, 52)",
                                                        }}
                                                        border
                                                        onClick={() =>
                                                            handleDeleteOfferButton(
                                                                offer._id
                                                            )
                                                        }
                                                    />
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </div>
                                </Col>
                                <Col sm={8} className="colonne-container-2">
                                    <div className="fenetre">
                                        <Tab.Content>
                                            {offres.map((offer) => (
                                                <Tab.Pane
                                                    eventKey={`#${offer._id}`}
                                                    key={offer._id}
                                                >
                                                    <div
                                                        style={{
                                                            borderBottom:
                                                                "1px solid #000",
                                                            marginBottom:
                                                                "10px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        <div>
                                                            {
                                                                offer.nomEntreprise
                                                            }
                                                        </div>
                                                        <div>
                                                            {offer.titrePoste}
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginBottom:
                                                                    "10px",
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faLocationDot
                                                                }
                                                                style={{
                                                                    color: "#2557a7",
                                                                }}
                                                            />{" "}
                                                            {offer.ville}
                                                        </div>
                                                    </div>
                                                    <div className="fonction-container">
                                                        {parse(offer.fonction)}
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Label>
                                                            Frontend
                                                            technologies :
                                                        </Label>
                                                        {parse(offer.frontend)}
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Label>
                                                            Backend technologies
                                                            :
                                                        </Label>
                                                        {parse(offer.backend)}
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Label>Salaire :</Label>
                                                        {parse(offer.salaire)}/h
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Label>
                                                            Langue(s) :
                                                        </Label>
                                                        {offer.francais && (
                                                            <>
                                                                {parse(
                                                                    offer.francais
                                                                )}
                                                            </>
                                                        )}
                                                        {offer.francais &&
                                                            offer.anglais && (
                                                                <>{"/"}</>
                                                            )}
                                                        {offer.anglais && (
                                                            <>
                                                                {parse(
                                                                    offer.anglais
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Label>
                                                            Date de début :
                                                        </Label>
                                                        {parse(offer.dateDebut)}
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Label>
                                                            Date de fin :
                                                        </Label>
                                                        {parse(offer.dateFin)}
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                        }}
                                                    >
                                                        <Label>
                                                            Le stage se fera :
                                                        </Label>
                                                        {parse(offer.lieuStage)}
                                                    </div>
                                                </Tab.Pane>
                                            ))}
                                        </Tab.Content>
                                    </div>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </>
                )}
                <Snackbar
                    open={open}
                    autoHideDuration={500}
                    onClose={handleClose}
                >
                    <div
                        className="message-succes"
                        style={{ fontWeight: "bold", fontSize: "17px" }}
                    >
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                            style={{
                                color: "white",
                                backgroundColor: "transparent",
                            }}
                        />
                        Offre supprimée avec succès!
                    </div>
                </Snackbar>
            </WrapperCustomContainer>

            <Footer />
        </ContainerStagium>
    );
};

export default ListeOffre;
