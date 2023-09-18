import React from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import "./styles/SingleViewUser.css";
import Footer from "../components/Footer";
import {
    ContainerStagium,
    WrapperCustomContainer,
    DashbordTitle,
    Line,
} from "./styles/common-styles";

const SingleViewUser = () => {
    const location = useLocation();
    return (
        <ContainerStagium>
            <Navbar />

            <WrapperCustomContainer style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <DashbordTitle>Gestion des {location.state.title}</DashbordTitle>
                <Line>
                    <hr />
                </Line>
                <Card />
            </WrapperCustomContainer>

            <Footer />
        </ContainerStagium>
    );
};

export default SingleViewUser;
