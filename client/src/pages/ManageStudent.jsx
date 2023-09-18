import Datatable from "../components/Datatable";
import { studentColums } from "../datatablestudent.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
    ContainerStagium,
    WrapperCustomContainer,
    DashbordTitle,
    Line,
} from "./styles/common-styles";
import { useEffect, useState } from "react";
import { getAllUsers } from "../requetes";

const ManageStudent = () => {
    const [noData, setNoData] = useState(false);
    const [ligneEtutiant, setLigneEtudiant] = useState([]);
    useEffect(() => {
        getAllUsers("etudiant", setLigneEtudiant, setNoData);
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
                <DashbordTitle>Gestion des étudiants</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                {/* datatable */}
                {ligneEtutiant.length === 0 ? (
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
                                ? "Aucun étudiant trouvé"
                                : "Chargement en cours..."}
                        </div>
                    </WrapperCustomContainer>
                ) : (
                    <Datatable
                        columns={studentColums}
                        rows={ligneEtutiant}
                        title="étudiants"
                        fonction={() =>
                            getAllUsers("etudiant", setLigneEtudiant, setNoData)
                        }
                    />
                )}
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default ManageStudent;
