import "./styles/ManageIntershipsOffer.css";
import Navbar from "../components/Navbar";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"; */
import CardOffer from "../components/CardOffer";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import {
    ContainerStagium,
    DashbordTitle,
    Line,
    WrapperCustomContainer,
} from "./styles/common-styles";
import { getOffres, getLocalStorageItemInfos } from "../requetes";
const ManageIntershipsOffer = () => {
    const [offres, setOffres] = useState(getLocalStorageItemInfos("offres"));
    const [noData, setNoData] = useState(false);
    useEffect(() => {
        getOffres(setOffres, setNoData);
    }, []);
    return (
        <ContainerStagium>
            <Navbar />
            <DashbordTitle>Gestion des offres</DashbordTitle>
            <Line>
                <hr />
            </Line>
            {/* Offres */}
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
                        <CardOffer key={offer._id} offer={offer} />
                    ))}
                </div>
            )}
            <Footer />
        </ContainerStagium>
    );
};

export default ManageIntershipsOffer;
