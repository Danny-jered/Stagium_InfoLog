import Navbar from "../components/Navbar";
import "./styles/AccountDetails.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import Footer from "../components/Footer";
import {
    ContainerStagium,
    Name,
    WrapperCustomContainer,
} from "./styles/common-styles";

import {
    InformationsContainer,
    InputContainer,
    Location,
    Picture,
    ProfilContainer,
    ProfilInfos,
    TopInfosContainer,
    TopInfosLeftContainer,
    TopInfosRightContainer,
    Label,
    Input,
    LangueContainer,
    Langue,
    Select,
    DocumentContainer,
    FileInput,
} from "./styles/account-style.js";
import {
    getUserInfos,
    updateUserInfos,
    getLocalStorageItemInfos,
} from "../requetes";

const AccountDetails = () => {
    const [user, setUser] = useState(getLocalStorageItemInfos("user"));
    const [update, setUpdate] = useState(false);
    const [onEdit, setOnEdit] = useState(false);
    const [telephone, setTelephone] = useState(user.telephone);
    const [nomEntreprise, setNomEntreprise] = useState(user.nomEntreprise);
    const [francais, setFrancais] = useState("");
    const [location, setLocation] = useState(user.location);
    const [anglais, setAnglais] = useState("");
    const [cv, setCv] = useState("");
    const [lettre, setLettre] = useState("");
    useEffect(() => {
        if (update) {
            if (user.typeUtilisateur === "étudiant")
                getUserInfos("etudiant", user._id, setUser);
            else if (user.typeUtilisateur === "agent")
                getUserInfos("agent", user._id, setUser);
            else if (user.typeUtilisateur === "employeur")
                getUserInfos("employeur", user._id, setUser);
            else getUserInfos("coordonnateur", user._id, setUser);
            setUpdate(false);
        }
    }, [update]);

    const handlerEditButton = () => {
        setOnEdit(!onEdit);
    };
    const handlerSubmitButton = async (event) => {
        event.preventDefault();

        if (user.typeUtilisateur === "étudiant") {
            let formData = new FormData();
            formData.append("telephone", telephone);
            formData.append("location", location);
            formData.append("francais", francais);
            formData.append("anglais", anglais);
            formData.append("fichier", cv);
            formData.append("fichier", lettre);
            updateUserInfos("etudiant", user._id, formData, setUpdate);
        } else if (user.typeUtilisateur === "agent") {
            const userInfos = { telephone, location };
            updateUserInfos("agent", user._id, userInfos, setUpdate);
        } else if (user.typeUtilisateur === "employeur") {
            const userInfos = { nomEntreprise, telephone, location };
            updateUserInfos("employeur", user._id, userInfos, setUpdate);
        } else {
            const userInfos = { telephone, location };
            updateUserInfos("coordonnateur", user._id, userInfos, setUpdate);
        }
        setOnEdit(!onEdit);
    };
    return (
        <ContainerStagium>
            <Navbar />
            <WrapperCustomContainer
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "10px",
                    marginTop: "30px",
                    pading: "20px",
                }}
            >
                <ProfilInfos>
                    <Picture />
                    <ProfilContainer>
                        <Name>{user.nom + ", " + user.prenom}</Name>
                        <Location>
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                style={{ color: "#2557a7" }}
                                onClick={handlerEditButton}
                            />
                            {user?.location.split(",")[1]}
                        </Location>
                    </ProfilContainer>
                </ProfilInfos>

                {/* //TODO: doit être transformé en component pour être réutilisable */}
                <InformationsContainer>
                    <TopInfosContainer>
                        <TopInfosLeftContainer>
                            Coordonnées
                        </TopInfosLeftContainer>
                        <TopInfosRightContainer>
                            {onEdit ? (
                                <></>
                            ) : (
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    onClick={handlerEditButton}
                                    style={{ backgroundColor: "transparent" }}
                                />
                            )}
                        </TopInfosRightContainer>
                    </TopInfosContainer>
                    {onEdit ? (
                        <div className="edit-infos">
                            <form
                                onSubmit={handlerSubmitButton}
                                className="admin-infos"
                            >
                                {user.typeUtilisateur === "employeur" && (
                                    <InputContainer>
                                        <Label htmlFor="nom-employeur">
                                            Nom de la compagnie :
                                        </Label>
                                        <Input
                                            type="text"
                                            id="nom-employeur"
                                            name="nom-employeur"
                                            placeholder="Compagnie"
                                            defaultValue={user.nomEntreprise}
                                            onChange={(e) =>
                                                setNomEntreprise(e.target.value)
                                            }
                                        />
                                    </InputContainer>
                                )}
                                <InputContainer>
                                    <Label htmlFor="phone">
                                        Votre numéro de téléphone :
                                    </Label>
                                    <Input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="+1 111-111-1111"
                                        defaultValue={user.telephone}
                                        onChange={(e) =>
                                            setTelephone(e.target.value)
                                        }
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Label htmlFor="address">
                                        Votre adresse :
                                    </Label>
                                    <Input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="1111 rue test, Montreal, CA"
                                        defaultValue={user.location}
                                        onChange={(e) =>
                                            setLocation(e.target.value)
                                        }
                                    />
                                </InputContainer>

                                {user.typeUtilisateur === "étudiant" && (
                                    <>
                                        <LangueContainer>
                                            <Langue>
                                                <Label htmlFor="francais">
                                                    Français :
                                                </Label>
                                                <Select
                                                    name="francais"
                                                    id="francais"
                                                    onChange={(e) =>
                                                        setFrancais(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="debutant">
                                                        Débutant
                                                    </option>
                                                    <option value="intermediaire">
                                                        Intermediaire
                                                    </option>
                                                    <option value="avancer">
                                                        Avancer
                                                    </option>
                                                </Select>
                                            </Langue>
                                            <Langue>
                                                <Label htmlFor="anglais">
                                                    Anglais :
                                                </Label>
                                                <Select
                                                    name="anglais"
                                                    id="anglais"
                                                    onChange={(e) =>
                                                        setAnglais(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="debutant">
                                                        Débutant
                                                    </option>
                                                    <option value="intermediaire">
                                                        Intermediaire
                                                    </option>
                                                    <option value="avancer">
                                                        Avancer
                                                    </option>
                                                </Select>
                                            </Langue>
                                        </LangueContainer>
                                        <DocumentContainer>
                                            <Label htmlFor="cv">
                                                Ajouter votre CV :
                                            </Label>
                                            <FileInput
                                                type="file"
                                                id="cv"
                                                name="cv"
                                                placeholder="Ajouter votre cv ici...!"
                                                onChange={(e) =>
                                                    setCv(e.target.files[0])
                                                }
                                            />
                                        </DocumentContainer>
                                        <DocumentContainer>
                                            <Label htmlFor="lettre">
                                                Ajouter lettre de présentation :
                                            </Label>
                                            <FileInput
                                                type="file"
                                                id="lettre"
                                                name="lettre"
                                                placeholder="Ajouter lettre de présentation!"
                                                onChange={(e) =>
                                                    setLettre(e.target.files[0])
                                                }
                                            />
                                        </DocumentContainer>
                                    </>
                                )}

                                <input
                                    type="submit"
                                    id="submit-button"
                                    value="Enregistrer"
                                />
                            </form>
                        </div>
                    ) : (
                        <div className="bottom-informations">
                            <p>{user.nom + ", " + user.prenom}</p>
                            <p>{user.telephone}</p>
                            <p>{user.location}</p>
                        </div>
                    )}
                </InformationsContainer>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default AccountDetails;
