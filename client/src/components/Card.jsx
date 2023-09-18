import "./styles/Card.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ConsultStudentApplies from "../pages/ConsultStudentApplies";
import Modal from "./Modal/Modal";
import ModalPopup from "./Modal/ModalPopup";
import {
    axiosInstance,
    getLocalStorageItemInfos,
    setLocalStorageItemInfos,
} from "../requetes";
import { Bouton } from "../pages/styles/common-styles.js";

const Card = () => {
    const navigate = useNavigate();
    const [consult, setConsult] = useState(false);
    const user = getLocalStorageItemInfos("user");
    const [singleUser, setSingleUser] = useState(
        getLocalStorageItemInfos("singleUser")
    );
    const [update, setUpdate] = useState(false);
    const [nom, setNom] = useState(singleUser.nom);
    const [prenom, setPrenom] = useState(singleUser.prenom);
    const [telephone, setTelephone] = useState(singleUser.telephone);
    const [location, setLocation] = useState(singleUser.location);
    const [email, setEmail] = useState(singleUser.email);
    const [onEdit, setOnEdit] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    useEffect(() => {
        const effacerDonnees = async () => {
            try {
                if (user.typeUtilisateur === "agent") {
                    await axiosInstance.delete(
                        `etudiant/delete/${singleUser._id}`
                    );
                    navigate("/manage-student");
                } else {
                    await axiosInstance.delete(
                        `agent/delete/${singleUser._id}`
                    );
                    navigate("/manage-agent");
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (deleteUser) {
            effacerDonnees();
        }
    }, [deleteUser, user.typeUtilisateur, navigate]);
    const handlerEditButton = () => {
        setOnEdit(!onEdit);
    };

    const handleDeleteButton = () => {
        setOnDelete(!onDelete);
    };
    const getSingleUser = async () => {
        try {
            let queryUser;
            if (user.typeUtilisateur === "agent") {
                queryUser = "etudiant";
            } else queryUser = "agent";
            const userInfos = await axiosInstance.get(
                `${queryUser}/${singleUser?._id}`
            );
            setLocalStorageItemInfos("singleUser", userInfos.data);
            setSingleUser(userInfos.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (update) {
            getSingleUser();
            setUpdate(false);
        }
    }, [update]);

    const handlerSubmitButton = async (event) => {
        event.preventDefault();
        const userInfos = { location, telephone, email, nom, prenom };
        let queryUser;
        if (user.typeUtilisateur === "agent") {
            queryUser = "etudiant";
        } else queryUser = "agent";
        try {
            await axiosInstance.put(
                `${queryUser}/update/${singleUser._id}`,
                userInfos,
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            setUpdate(true);
        } catch (error) {
            console.log(error);
        }
        setOnEdit(!onEdit);
    };

    const handleConsultButton = () => {
        console.log("Consult");
        setConsult(!consult);
    };
    return (
        <div className="card-container">
            {consult && (
                <Modal setModal={setConsult} modalValue={consult}>
                    <ConsultStudentApplies user={singleUser} />
                </Modal>
            )}

            {onDelete && (
                <ModalPopup
                    setModal={setOnDelete}
                    modalValue={onDelete}
                    setResponse={setDeleteUser}
                />
            )}
            <div className="card-informations">
                <div className="top-informations">
                    <div className="top-left-informations">Informations</div>
                    <div className="card-top-right-informations">
                        {onEdit ? (
                            <></>
                        ) : (
                            <div className="buttons">
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    onClick={handleDeleteButton}
                                />
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    onClick={handlerEditButton}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {onEdit ? (
                    <div className="card-edit-infos">
                        <form
                            onSubmit={handlerSubmitButton}
                            className="admin-infos"
                        >
                            <div className="name-container">
                                <label htmlFor="name" className="name-label">
                                    Nom :
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={singleUser.nom}
                                    onChange={(e) => setNom(e.target.value)}
                                    placeholder="Nom "
                                />
                            </div>
                            <div className="fisrt_name-container">
                                <label
                                    htmlFor="fisrt_name"
                                    className="fisrt_name-label"
                                >
                                    Prénom (s) :
                                </label>
                                <input
                                    type="text"
                                    id="fisrt_name"
                                    name="fisrt_name"
                                    defaultValue={singleUser.prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    placeholder="Prénom (s) "
                                />
                            </div>
                            <div className="adresse-container">
                                <label
                                    htmlFor="adresse"
                                    className="adresse-label"
                                >
                                    Adresse :
                                </label>
                                <input
                                    type="text"
                                    id="adresse"
                                    name="adresse"
                                    defaultValue={singleUser.location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    placeholder="adresse "
                                />
                            </div>
                            <div className="phone-container">
                                <label htmlFor="phone" className="phone-label">
                                    Numéro de téléphone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    defaultValue={singleUser.telephone}
                                    onChange={(e) =>
                                        setTelephone(e.target.value)
                                    }
                                    placeholder="+1 111-111-1111"
                                />
                            </div>
                            <div className="email-container">
                                <label htmlFor="email" className="email-label">
                                    Courriel
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    defaultValue={singleUser.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Courriel"
                                />
                            </div>
                            <input
                                type="submit"
                                id="submit-button"
                                value="Enrégistrer"
                            />
                        </form>
                    </div>
                ) : (
                    <div className="bottom-informations">
                        {user.typeUtilisateur === "agent" && (
                            <div className="buttons">
                                <Bouton
                                    style={{ fontSize: "17px" }}
                                    onClick={handleConsultButton}
                                >
                                    Consulter les candidatures
                                </Bouton>
                                <Bouton style={{ fontSize: "17px" }}>
                                    Changer statut
                                </Bouton>
                            </div>
                        )}
                        {user.typeUtilisateur === "admin" && (
                            <p className={`status-${singleUser.statut}`}>
                                {singleUser.statut}
                            </p>
                        )}

                        <p>{`${singleUser.nom} ${singleUser.prenom}`}</p>
                        <p>{singleUser.telephone}</p>
                        <p>{singleUser.email}</p>
                        {user.typeUtilisateur === "agent" &&
                            singleUser.stages.length > 0 &&
                            singleUser.stages.map((stage) => (
                                <p>
                                    Stage {stage.demarche} : {stage.statut}
                                </p>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
