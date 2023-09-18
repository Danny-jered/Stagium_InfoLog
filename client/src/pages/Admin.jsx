import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
    ContainerStagium,
    DashbordTitle,
    Identification,
    Label,
    Line,
    ManageOptions,
    Name,
    OptionsContainer,
    WrapperCustomContainer,
} from "./styles/common-styles";
import { getLocalStorageItemInfos } from "../requetes.js";

const Admin = () => {
    const navigate = useNavigate();
    const user = getLocalStorageItemInfos("user");
    const handlerManageUsersButton = () => {
        navigate("/manage-agent");
    };

    return (
        <ContainerStagium>
            <Navbar />
            <WrapperCustomContainer>
                <DashbordTitle>TABLEAU DE BORD</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                <Identification>
                    <Label> Coordonnateur :</Label>
                    <Name>{user.nom + ", " + user.prenom}</Name>
                </Identification>
                <Identification>
                    <Label> Immatricule :</Label>
                    <Name>{user.code}</Name>
                </Identification>
                <Identification>
                    <Label> Université :</Label>
                    <Name>{user.universite}</Name>
                </Identification>
                <OptionsContainer>
                    <ManageOptions onClick={handlerManageUsersButton}>
                        Gérer agents de stage
                    </ManageOptions>
                    <ManageOptions>Gérer système</ManageOptions>
                </OptionsContainer>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default Admin;
