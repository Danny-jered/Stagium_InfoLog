import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
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

const Etudiant = () => {
    const navigate = useNavigate();
    const user = getLocalStorageItemInfos("user");
    return (
        <ContainerStagium>
            <Navbar />
            <WrapperCustomContainer>
                <DashbordTitle>Bienvenue sur la page Etudiant</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                <Identification>
                    <Label> Étudiant :</Label>
                    <Name>{user.nom + ", " + user.prenom}</Name>
                </Identification>
                <Identification>
                    <Label> Code permanent :</Label>
                    <Name>{user.code}</Name>
                </Identification>
                <Identification>
                    <Label> Université :</Label>
                    <Name>{user.universite}</Name>
                </Identification>
                <OptionsContainer>
                    <ManageOptions
                        onClick={() => navigate(`/account/${user._id}`)}
                    >
                        Modifier compte
                    </ManageOptions>

                    <ManageOptions onClick={() => navigate("/offres-stages")}>
                        Consulter offres de stages
                    </ManageOptions>

                    <ManageOptions
                        onClick={() => navigate(`/candidatures/${user._id}`)}
                    >
                        Consulter mes candidatures
                    </ManageOptions>
                </OptionsContainer>
            </WrapperCustomContainer>
            <Footer />
        </ContainerStagium>
    );
};

export default Etudiant;
