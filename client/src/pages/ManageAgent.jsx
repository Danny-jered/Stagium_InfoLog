import Datatable from "../components/Datatable";
import Navbar from "../components/Navbar";
import { agentColums } from "../datatablesource.js";
import Footer from "../components/Footer";
import {
    ContainerStagium,
    WrapperCustomContainer,
    DashbordTitle,
    Line,
} from "./styles/common-styles";
import { useState, useEffect } from "react";
import { getAllUsers } from "../requetes";

const ManageAgent = () => {
    const [noData, setNoData] = useState(false);
    const [ligneAgent, setLigneAgent] = useState([]);

    useEffect(() => {
        getAllUsers("agent", setLigneAgent, setNoData);
    }, []);
    return (
        <ContainerStagium>
            <Navbar />
            <WrapperCustomContainer
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <DashbordTitle>Gestion des agents</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                {/* datatable */}
                {ligneAgent.length === 0 ? (
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
                                ? "Aucun agent trouvé"
                                : "Chargement en cours..."}
                        </div>
                    </WrapperCustomContainer>
                ) : (
                    <Datatable
                        columns={agentColums}
                        rows={ligneAgent}
                        title="agents"
                        fonction={() =>
                            getAllUsers("agent", setLigneAgent, setNoData)
                        }
                    />
                )}
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default ManageAgent;
