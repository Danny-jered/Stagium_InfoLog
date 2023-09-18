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
const Agent = () => {
    const navigate = useNavigate();
    const user = getLocalStorageItemInfos("user");
    const handlerManageStudentsButton = () => {
        navigate("/manage-student");
    };
    const handlerManageOffersButton = () => {
        navigate("/manage-offer");
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
                    <Label> Agent :</Label>
                    <Name>{user.nom + ", " + user.prenom} </Name>
                </Identification>
                <Identification>
                    <Label> Immatricule :</Label> <Name>{user.code}</Name>
                </Identification>

                <Identification>
                    <Label> Université :</Label> <Name>{user.universite}</Name>
                </Identification>

                <OptionsContainer>
                    <ManageOptions onClick={handlerManageStudentsButton}>
                        Gérer étudiants
                    </ManageOptions>
                    <ManageOptions onClick={handlerManageOffersButton}>
                        Gérer offres de stages
                    </ManageOptions>
                </OptionsContainer>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default Agent;
