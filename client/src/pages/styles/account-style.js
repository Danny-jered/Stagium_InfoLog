import styled, { css } from "styled-components";

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 680px) {
            ${props}
        }
    `;
};

export const ProfilInfos = styled.div`
    display: flex;
    height: 70px;
    gap: 20px;
`;

export const ProfilContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

export const Picture = styled.div`
    display: flex;
    height: 70px;
    width: 70px;
    align-items: center;
    border: 0.5px solid #a1a0a0;
    justify-content: center;
    border-radius: 50%;
`;

export const Location = styled.div`
    width: 100%;
    font-size: 17px;
`;

export const InformationsContainer = styled.div`
    padding: 25px;
    width: 40%;
    border-radius: 3px;
    margin-top: 20px;
    box-shadow: 0px 0px 22px 0px #a1a0a0;
    font-size: 15px;
    ${mobile({ width: "100%" })}
`;

export const TopInfosContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

export const TopInfosLeftContainer = styled.div`
    font-weight: bold !important;
`;

export const TopInfosRightContainer = styled.div`
    cursor: pointer;
    padding: 5px;
    :hover {
        background: #3968b4;
    }
`;

export const InputContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Label = styled.label`
    ${mobile({ fontSize: "17px" })}
`;

export const Input = styled.input`
    padding: 10px;
    border: none;
    border-bottom: 0.5px solid #a1a0a0 !important;
    :focus {
        outline: none;
    }
    ${mobile({ fontSize: "15px" })}
`;
export const LangueContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`;

export const Langue = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

export const Select = styled.select`
    padding: 5px;
    border: 0.5px solid #a1a0a0;
    border-radius: 5px;
`;

export const DocumentContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const FileInput = styled.input`
    padding: 5px;
    border: 0.5px solid #a1a0a0;
    border-radius: 5px;
    width: 300px;
`;
