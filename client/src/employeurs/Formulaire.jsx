import "./Employer.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Snackbar from "@mui/material/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {
    ContainerStagium,
    DashbordTitle,
    Line,
    WrapperCustomContainer,
} from "../pages/styles/common-styles";
import {
    axiosInstance,
    getLocalStorageItemInfos,
    setLocalStorageItemInfos,
} from "../requetes";
/*
La compagnie:
Site de l'entrerprise:
Titre poste
Fonction
Environnemnet technologique
FrontEnd
Backend:
Autres exigence
Nombre de stagiaire requis
Langue de travail
Lieu de stage
À distance/en personne

Date de début
Date de fin:
Salaire:
Heures par semaines

Responsable de l'offre
Superviseur prévu
*/

const Formulaire = () => {
    const user = getLocalStorageItemInfos("user");
    const navigate = useNavigate();
    const [nomEntreprise, setNomEntreprise] = useState("");
    const [titrePoste, setTitrePoste] = useState("");
    const [fonction, setFonction] = useState("");
    const [backend, setBackend] = useState("");
    const [frontend, setFrontend] = useState("");
    const [autreExigences, setAutreExigences] = useState("");
    const [ville, setVille] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [nombrebStagiares, setNombreStagiaires] = useState(0);
    const [province, setProvince] = useState("Québec");
    const [francais, setFrancais] = useState("");
    const [anglais, setAnglais] = useState("");
    const [autreLangue, setAutreLangue] = useState("");
    const [salaire, setSalaire] = useState("19-20");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [lieuStage, setLieuStage] = useState("");
    const [nombreHeureSemaine, setNombreHeureSemaine] = useState(35);
    const [responsableOffre, setResponsableOffre] = useState("");
    const [superviseurStage, setSuperviseurStage] = useState("");
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const editor = useRef(null);
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/,
        placeholder: "Tapez ici ...",
    };

    const handlerSubmitButton = async (e) => {
        e.preventDefault();
        try {
            const data = getLocalStorageItemInfos("offres");
            const formData = {
                nomEntreprise,
                titrePoste,
                fonction,
                backend,
                frontend,
                autreExigences,
                ville,
                codePostal,
                province,
                nombrebStagiares,
                francais,
                anglais,
                autreLangue,
                salaire,
                nombreHeureSemaine,
                responsableOffre,
                superviseurStage,
                dateDebut,
                dateFin,
                lieuStage,
            };

            const offre = await axiosInstance.post(
                `offres/${user._id}`,
                formData
            );
            data.push(offre.data);
            setLocalStorageItemInfos("offres", data);
            handleClick();
            setTimeout(() => {
                navigate("/manage-offres-employeur");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ContainerStagium>
            <Navbar />
            <DashbordTitle>Dépôt offre de stage</DashbordTitle>
            <Line>
                <hr />
            </Line>
            <WrapperCustomContainer style={{ marginBottom: "10px" }}>
                <Form onSubmit={handlerSubmitButton}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="Form.NomEntreprise">
                            <Form.Label>Nom de l'entreprise:</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) =>
                                    setNomEntreprise(e.target.value)
                                }
                                placeholder="Nom exemple inc."
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="Form.NomPoste">
                            <Form.Label>Titre du poste: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Développeur stagiaire."
                                onChange={(e) => setTitrePoste(e.target.value)}
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Fonctions du stagiaire:</Form.Label>
                        {/* <Form.Control
                            as="textarea"
                            rows={5}
                            onChange={(e) => setFonction(e.target.value)}
                        /> */}
                        <JoditEditor
                            ref={editor}
                            value={fonction}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setFonction(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => {}}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Environnement technologique:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="FrontEnd:"
                            onChange={(e) => setFrontend(e.target.value)}
                        />
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="BackEnd:"
                            onChange={(e) => setBackend(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Autres exigences:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            onChange={(e) => setAutreExigences(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control
                                onChange={(e) => setVille(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Province</Form.Label>
                            <Form.Select
                                defaultValue={province}
                                onChange={(e) => setProvince(e.target.value)}
                            >
                                <option>Alberta</option>
                                <option>Colombie-Britannique</option>
                                <option>Île-du-Prince-Édouard </option>
                                <option>Manitoba</option>
                                <option>Nouveau-Brunswick</option>
                                <option>Nouvelle-Écosse</option>
                                <option>Ontario</option>
                                <option>Québec</option>
                                <option>Saskatchewan</option>
                                <option>Terre-Neuve-et-Labrador</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Code postal</Form.Label>
                            <Form.Control
                                onChange={(e) => setCodePostal(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Nombre de stagiaire requis</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="1"
                                onChange={(e) =>
                                    setNombreStagiaires(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Langue(s) de travail</Form.Label>
                            <Form.Check
                                type="checkbox"
                                id="autoSizingCheck"
                                className="mb-2"
                                label="Français"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFrancais("français");
                                    } else {
                                        setFrancais("");
                                    }
                                }}
                            />
                            <Form.Check
                                type="checkbox"
                                id="autoSizingCheck"
                                className="mb-2"
                                label="Anglais"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setAnglais("anglais");
                                    } else {
                                        setAnglais("");
                                    }
                                }}
                            />
                            <Form.Check
                                type="checkbox"
                                id="autoSizingCheck"
                                className="mb-2"
                                label="Autre"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setAutreLangue("autre");
                                    } else {
                                        setAutreLangue("");
                                    }
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Le stage sera:</Form.Label>
                            <Form.Check
                                type="radio"
                                label="à distance"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setLieuStage("à distance");
                                    } else {
                                        setLieuStage("");
                                    }
                                }}
                            />
                            <Form.Check
                                type="radio"
                                label="en personne"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setLieuStage("en personne");
                                    } else {
                                        setLieuStage("");
                                    }
                                }}
                            />
                            <Form.Check
                                type="radio"
                                label="hybride"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setLieuStage("hybride");
                                    } else {
                                        setLieuStage("");
                                    }
                                }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Heures par semaine:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="35-40h"
                                onChange={(e) =>
                                    setNombreHeureSemaine(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Salaire de l'heure:</Form.Label>
                            <Form.Select
                                defaultValue="19-20"
                                onChange={(e) => setSalaire(e.target.value)}
                            >
                                <option>Salaire minimum</option>
                                <option>15-16</option>
                                <option>17-18</option>
                                <option>19-20</option>
                                <option>21-22</option>
                                <option>23-24</option>
                                <option>25-28</option>
                                <option>supérieur à 28</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Date de début:</Form.Label>
                            <Form.Control
                                type="date"
                                name="duedate"
                                placeholder="date début"
                                onChange={(e) => setDateDebut(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Date de fin:</Form.Label>
                            <Form.Control
                                type="date"
                                name="duedate"
                                placeholder="date fin"
                                onChange={(e) => setDateFin(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="Form.NomEntreprise">
                            <Form.Label>Responsable de l'offre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Monsieur Dupuis technicien RH"
                                onChange={(e) =>
                                    setResponsableOffre(e.target.value)
                                }
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="Form.NomPoste">
                            <Form.Label>Superviseur prévu: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Madame Lee Directrice TI"
                                onChange={(e) =>
                                    setSuperviseurStage(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Row>
                    <Button className="custom-submit" type="submit">
                        Soumettre
                    </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        onClose={handleClose}
                    >
                        <div className="message-succes">
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent",
                                }}
                            />
                            Offre déposée avec succès!
                        </div>
                    </Snackbar>
                </Form>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default Formulaire;
