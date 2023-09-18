import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CardOffer from "../components/CardOffer";
import Footer from "../components/Footer";
import {
    Bouton,
    ContainerStagium,
    DashbordTitle,
    InputContainer,
    InputTextSearch,
    Line,
    RechercheContainer,
    WrapperCustomContainer,
} from "./styles/common-styles";

import { Select } from "./styles/account-style";

import {
    axiosInstance,
    getOffres,
    getLocalStorageItemInfos,
} from "../requetes";

const OffresStages = () => {
    const [offres, setOffres] = useState(getLocalStorageItemInfos("offres"));

    const [statut, setStatut] = useState([[""]]);
    const [titrePosteRecherche, setTitrePosteRecherche] = useState("");
    const [villeRecherche, setVilleRecherche] = useState("ville");
    const [datePublication, setDatePublication] = useState("asc");
    const [languePoste, setLanguePoste] = useState("defaut");
    const [salaire, setSalaire] = useState("salaire");
    const [lieuStage, setLieuStage] = useState("lieustage");
    const [noData, setNoData] = useState(false);

    const handleSearchButton = async () => {
        // query search
        setNoData(false);
        try {
            setOffres([]);
            const resultatOffres = await axiosInstance.get(
                `offres/search?titrePoste=${titrePosteRecherche}&ville=${villeRecherche}&date=${datePublication}&langue=${languePoste}&salaire=${salaire}&lieuStage=${lieuStage}`
            );
            if (resultatOffres.data.length === 0) setNoData(true);
            setOffres(resultatOffres.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOffres(setOffres, setNoData);
    }, []);
    return (
        <ContainerStagium
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Navbar />

            <DashbordTitle>Offres de stages</DashbordTitle>
            <Line>
                <hr />
            </Line>
            <RechercheContainer>
                <InputContainer>
                    <InputTextSearch
                        type="text"
                        placeholder="Titre du poste..."
                        onChange={(e) => setTitrePosteRecherche(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Select
                        onChange={(e) => setVilleRecherche(e.target.value)}
                        style={{ width: "fit-content" }}
                        name="ville"
                        id="ville"
                        defaultValue={villeRecherche}
                    >
                        <option value="Montréal">Montréal</option>
                        <option value="Laval">Laval</option>
                        <option value="Québec">Québec</option>
                        <option value="Longueuil">Longueuil</option>
                        <option value="ville">Villes</option>
                    </Select>
                    <Select
                        onChange={(e) => setLieuStage(e.target.value)}
                        style={{ width: "fit-content" }}
                        name="lieustage"
                        id="lieustage"
                        defaultValue={lieuStage}
                    >
                        <option value="lieustage">Lieu stage</option>
                        <option value="à distance">à distance</option>
                        <option value="en personne">en personne</option>
                        <option value="hybride">hybride</option>
                    </Select>
                    <Select
                        onChange={(e) => setSalaire(e.target.value)}
                        style={{ width: "fit-content" }}
                        name="salaire"
                        id="salaire"
                        defaultValue={salaire}
                    >
                        <option value="salaire">Salaire</option>
                        <option value="15-16">15-16</option>
                        <option value="17-18">17-18</option>
                        <option value="19-20">19-20</option>
                        <option value="21-22">21-22</option>
                        <option value="23-24">23-24</option>
                        <option value="25-28">25-28</option>
                        <option value="supérieur à 28">supérieur à 28</option>
                    </Select>
                    <Select
                        onChange={(e) => setDatePublication(e.target.value)}
                        style={{ width: "fit-content" }}
                        name="date"
                        id="date"
                        defaultValue={datePublication}
                    >
                        <option value="desc">Plus récentes</option>
                        <option value="asc">Plus anciennes</option>
                    </Select>
                    <Select
                        onChange={(e) => setLanguePoste(e.target.value)}
                        style={{ width: "fit-content" }}
                        name="langue"
                        id="langue"
                        defaultValue={languePoste}
                    >
                        <option value="francais">Français</option>
                        <option value="anglais">Anglais</option>
                        <option value="defaut">Langue du poste</option>
                    </Select>
                </InputContainer>
                <Bouton
                    style={{
                        width: "fit-content",
                    }}
                    onClick={handleSearchButton}
                >
                    Rechercher
                </Bouton>
            </RechercheContainer>
            {/* Offres de stage */}
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
                            ? "Aucune offre trouvée"
                            : "Chargement en cours..."}
                    </div>
                </WrapperCustomContainer>
            ) : (
                <div className="offers-container">
                    {offres.map((offer) => (
                        <CardOffer
                            key={offer._id}
                            offer={offer}
                            onClick={() => console.log("here")}
                        />
                    ))}
                </div>
            )}

            <Footer />
        </ContainerStagium>
    );
};

export default OffresStages;
