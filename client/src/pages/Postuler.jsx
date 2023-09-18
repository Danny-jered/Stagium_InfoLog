import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./styles/Postuler.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
    ContainerStagium,
    DashbordTitle,
    WrapperCustomContainer,
    Line,
} from "./styles/common-styles";
import { axiosInstance, getLocalStorageItemInfos } from "../requetes";

const steps = ["Ajoutez votre CV *", "Ajoutez Lettre/Reference", "Postuler"];

const Postuler = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [cv, setCv] = React.useState("");
    const [cvFichier, setCvFichier] = React.useState("");
    const [cvActuel, setCvActuel] = React.useState(false);
    const [cvNouveau, setCvNouveau] = React.useState(false);
    const [nextDisable, setNextDisable] = React.useState(false);
    const [lettre, setLettre] = React.useState("Aucun");
    const [lettreFichier, setLettreFichier] = React.useState("");
    const user = getLocalStorageItemInfos("user");

    // étape 2 optionnel (ajout lettre)
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    useEffect(() => {
        if (activeStep + 1 === 1) {
            setCvActuel(false);
            setCvNouveau(false);
            setLettre("Aucun");
        } else if (activeStep + 1 === 2) {
            setLettre("Aucun");
        }
    }, [activeStep]);
    useEffect(() => {
        const handleDisableNext = () => {
            if ((!cvActuel && !cvNouveau) || (cvActuel && cvNouveau))
                setNextDisable(true);
            else setNextDisable(false);
        };
        handleDisableNext();
    }, [cvActuel, cvNouveau]);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (activeStep === steps.length - 1) {
            let formData = new FormData();
            formData.append("candidat", user._id);
            formData.append("nom", user.nom);
            formData.append("prenom", user.prenom);
            if (cvActuel) formData.append("cv", cvFichier);
            else formData.append("fichier", cvFichier);
            formData.append("fichier", lettreFichier);

            const body = { id: state.offre._id };

            try {
                axiosInstance.put(`/etudiant/add-offer/${user._id}`, body);
                axiosInstance.put(
                    `/offres/add-candidate/${state.offre._id}`,
                    formData,
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }
                );
            } catch (error) {
                console.log(error);
            }
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
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
                <DashbordTitle>Postuler</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                <Box sx={{ width: "50%" }}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepOptional(index)) {
                                labelProps.optional = (
                                    <Typography
                                        sx={{
                                            backgroundColor:
                                                "transparent !important",
                                        }}
                                        variant="caption"
                                    >
                                        (optionnel)
                                    </Typography>
                                );
                            }
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <div sx={{ mt: 2, mb: 1 }}>
                                <div className="sucess">
                                    <Alert
                                        sx={{
                                            border: ".5px solid #2557a7",
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        Votre candidature a bien été envoyée!
                                    </Alert>
                                    <div
                                        className="continuer"
                                        onClick={() =>
                                            navigate("/offres-stages")
                                        }
                                    >
                                        Continuer
                                    </div>
                                </div>
                            </div>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    pt: 2,
                                }}
                            >
                                <Box sx={{ flex: "1 1 auto" }} />
                                {/* <Button onClick={handleReset}>Reset</Button> */}
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div sx={{ mt: 2, mb: 1 }}>
                                {activeStep + 1 === 1 && (
                                    <form className="ajout-cv-container">
                                        <div className="cv-label">
                                            <input
                                                type="checkbox"
                                                id="cv-checkbox"
                                                name="cv-checkbox"
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setCvActuel(true);
                                                        setCvFichier(user.cv);
                                                    } else {
                                                        setCvActuel(false);
                                                    }
                                                }}
                                            ></input>
                                            <label htmlFor="cv-checkbox">
                                                Utilisez votre cv actuel
                                            </label>
                                        </div>
                                        <div id="ou">ou</div>
                                        <div className="ajout-cv">
                                            <label htmlFor="cv-input">
                                                Changez votre cv (extension .pdf
                                                seulement) :
                                            </label>
                                            <input
                                                type="file"
                                                id="cv-input"
                                                className="cv-input"
                                                accept=".pdf"
                                                onChange={(e) => {
                                                    setCvNouveau(true);
                                                    setCvFichier(
                                                        e.target.files[0]
                                                    );
                                                    setCv(
                                                        e.target.files[0].name
                                                    );
                                                }}
                                            />
                                        </div>
                                    </form>
                                )}
                                {activeStep + 1 === 2 && (
                                    <form className="ajout-lettre-container">
                                        <div className="ajout-lettre">
                                            <label htmlFor="lettre-cv">
                                                Ajouter une lettre ou tout autre
                                                document pertinent (extension
                                                .pdf seulement) :
                                            </label>
                                            <input
                                                type="file"
                                                id="lettre-cv"
                                                accept=".pdf"
                                                className="lettre-cv"
                                                onChange={(e) => {
                                                    setLettreFichier(
                                                        e.target.files[0]
                                                    );
                                                    setLettre(
                                                        e.target.files[0].name
                                                    );
                                                }}
                                            />
                                        </div>
                                    </form>
                                )}
                                {activeStep + 1 === 3 && (
                                    <div className="examiner">
                                        <div className="titre-container">
                                            Votre candidature :{" "}
                                        </div>
                                        <div className="infos-candidat">
                                            <div className="nom-candidat">
                                                <div className="gauche">
                                                    Nom, Prénom(s) :
                                                </div>
                                                <div className="droite">
                                                    {user.nom +
                                                        ", " +
                                                        user.prenom}
                                                </div>
                                            </div>
                                            <div className="cv-candidat">
                                                <div className="gauche">
                                                    Votre cv :
                                                </div>
                                                <div className="droite">
                                                    {cvActuel === true
                                                        ? "cvActuel.pdf"
                                                        : cv}
                                                </div>
                                            </div>
                                            <div className="lettre-candidat">
                                                <div className="gauche">
                                                    Autre document :
                                                </div>
                                                <div className="droite">
                                                    {lettre}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    pt: 2,
                                }}
                            >
                                <button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className="btn-back"
                                >
                                    précédent
                                </button>
                                <Box sx={{ flex: "1 1 auto" }} />
                                {isStepOptional(activeStep) && (
                                    <button
                                        className="btn-ignorer"
                                        onClick={handleSkip}
                                    >
                                        Ignorer
                                    </button>
                                )}

                                <button
                                    className="btn-next"
                                    disabled={nextDisable}
                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1
                                        ? "Postuler"
                                        : "suivant"}
                                </button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default Postuler;
