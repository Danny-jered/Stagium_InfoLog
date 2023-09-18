import styled, { css } from "styled-components";

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 680px) {
            ${props}
        }
    `;
};

export const ContainerStagium = styled.div`
    margin-left: 40px;
    margin-right: 40px;
`;

export const WrapperCustomContainer = styled.div`
    min-height: 80vh;
    ${mobile({ width: "100%" })}
`;

export const DashbordTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2557a7;
    font-weight: bold;
    font-size: 25px;
    margin-top: 25px;
    margin-bottom: 5px;
`;

export const Line = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    hr {
        height: 1px;
        width: 100px;
        background: #2557a7;
        border: none;
        margin-bottom: 60px;
    }
`;

export const Identification = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const Name = styled.p``;

export const Label = styled.p`
    font-weight: bold;
`;

export const OptionsContainer = styled.div`
    margin-top: 40px;
    display: flex;
    height: 400px;
    gap: 100px;
    width: 100%;
    ${mobile({ flexDirection: "column", gap: "10px" })}
`;

export const ManageOptions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2557a7;
    cursor: pointer;
    box-shadow: 0px 0px 22px 0px #a1a0a0;
    color: #fff;
    height: 50%;
    flex: 1;
    border-radius: 5px;
    transition: all 0.5s ease-in-out;
    &:hover {
        background: #3968b4;
        transform: scale(1.1);
    }
`;

export const Bouton = styled.div`
    background: #2557a7;
    color: #fff;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.5s ease-in-out;
    &:hover {
        background: #3968b4;
        transform: scale(1.05);
    }
`;
export const BoutonSupprimer = styled.div`
    background: rgb(245, 52, 52);
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
        background: rgb(249, 72, 72);
        transform: scale(1.05);
    }
`;
export const RechercheContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    gap: 10px;
    font-size: 17px;
    border-bottom: 0.5px solid #a1a0a0;
    padding: 10px;
    width: 90%;
`;

export const InputContainer = styled.div`
    display: flex;
    gap: 10px;
    flex: 2;
`;

export const InputTextSearch = styled.input`
    width: 100%;
    border: 0.5px solid #a1a0a0;
    border-radius: 5px;
    padding: 10px;
    color: gray;
    transition: all 0.5s ease-in-out;
    :focus {
        outline: none;
        border: none;
        border-radius: 0px;
        border-bottom: 0.5px solid #a1a0a0;
    }
`;

export const FieldContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const InputFieldText = styled.input`
    padding: 10px;
    border: none;
    border-bottom: 0.5px solid #000;
    :focus {
        outline: none;
        border-bottom: 0.5px solid #2557a7;
    }
`;
