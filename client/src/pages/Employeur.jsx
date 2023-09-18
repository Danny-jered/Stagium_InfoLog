import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";

import {
    ContainerStagium,
    WrapperCustomContainer,
    DashbordTitle,
    Identification,
    Name,
    ManageOptions,
    OptionsContainer,
    Line,
    Label,
} from "./styles/common-styles";
import { getLocalStorageItemInfos } from "../requetes.js";

const Employeur = () => {
    const navigate = useNavigate();
    const user = getLocalStorageItemInfos("user");
    return (
        <ContainerStagium>
            <Navbar />
            <WrapperCustomContainer>
                <DashbordTitle>TABLEAU DE BORD</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                <Identification>
                    <Label> Compagnie :</Label>
                    <Name>{user.nomEntreprise}</Name>
                </Identification>
                <OptionsContainer>
                    <ManageOptions
                        onClick={() => navigate(`/account/${user._id}`)}
                    >
                        Modifier compte
                    </ManageOptions>
                    <ManageOptions
                        onClick={() => navigate("/manage-offres-employeur")}
                    >
                        Gérer offres de stages
                    </ManageOptions>
                    <ManageOptions onClick={() => navigate("/candidats")}>
                        Accéder aux candidatures
                    </ManageOptions>
                </OptionsContainer>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default Employeur;
