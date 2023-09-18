import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./styles/AddNewUser.css";
import {
    ContainerStagium,
    WrapperCustomContainer,
    DashbordTitle,
    Line,
    FieldContainer,
    InputFieldText,
} from "./styles/common-styles";

import { axiosInstance, getLocalStorageItemInfos } from "../requetes.js";

const AddNewUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getLocalStorageItemInfos("user");
    const [nom, SetNom] = useState("");
    const [prenom, SetPrenom] = useState("");
    const [code, SetCode] = useState("");
    const [telephone, SetTelephone] = useState("");
    const [ville, SetVille] = useState("");
    const [courriel, SetCourriel] = useState("");
    const [universite, SetUniversite] = useState("");

    const handlerSubmitButton = async (event) => {
        event.preventDefault();

        const body = {
            nom,
            prenom,
            ville,
            location: ville,
            code,
            email: courriel,
            universite,
            telephone,
        };
        if (user.typeUtilisateur === "agent") {
            console.log("agent");
            try {
                await axiosInstance.post("auths/register-student", body);
                navigate("/manage-student");
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await axiosInstance.post("auths/register-agent", body);
                navigate("/manage-agent");
            } catch (error) {
                console.log(error);
            }
        }
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
                }}
            >
                <DashbordTitle>
                    Gestion des {location.state.title}
                </DashbordTitle>
                <Line>
                    <hr />
                </Line>
                {/* form */}
                <div className="agent-infos">
                    <form
                        onSubmit={handlerSubmitButton}
                        className="admin-infos"
                    >
                        <FieldContainer>
                            <label htmlFor="nom">Nom de famille * :</label>
                            <InputFieldText
                                type="text"
                                id="nom"
                                name="nom"
                                placeholder="Nom"
                                required
                                onChange={(e) => SetNom(e.target.value)}
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <label htmlFor="prenom">Prénom(s) * :</label>
                            <InputFieldText
                                type="text"
                                id="prenom"
                                name="prenom"
                                placeholder="Prénom(s)"
                                required
                                onChange={(e) => SetPrenom(e.target.value)}
                            />
                        </FieldContainer>

                        <FieldContainer>
                            <label htmlFor="code">Code * :</label>
                            <InputFieldText
                                type="text"
                                id="code"
                                name="code"
                                placeholder="Code LLLL11223344"
                                required
                                onChange={(e) => SetCode(e.target.value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <label htmlFor="telephone" className="phone-label">
                                Numéro de téléphone * :
                            </label>
                            <InputFieldText
                                type="text"
                                id="telephone"
                                name="telephone"
                                placeholder="+1 111-111-1111"
                                required
                                onChange={(e) => SetTelephone(e.target.value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <label htmlFor="location">Adresse * :</label>
                            <InputFieldText
                                type="text"
                                id="location"
                                name="location"
                                required
                                placeholder="90 chemin staguim, Montreal, CA..."
                                onChange={(e) => SetVille(e.target.value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <label htmlFor="email">Courriel * :</label>
                            <InputFieldText
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Courriel..."
                                required
                                onChange={(e) => SetCourriel(e.target.value)}
                            />
                        </FieldContainer>
                        <FieldContainer>
                            <label htmlFor="universite">Université * :</label>
                            <InputFieldText
                                type="text"
                                id="universite"
                                name="universite"
                                placeholder="Universite..."
                                required
                                onChange={(e) => SetUniversite(e.target.value)}
                            />
                        </FieldContainer>
                        <input
                            type="submit"
                            id="submit-button"
                            value={
                                location.state.title === "étudiants"
                                    ? "Ajouter un étudiant"
                                    : "Ajouter un agent"
                            }
                        />
                    </form>
                </div>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default AddNewUser;
