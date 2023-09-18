import { useState, useEffect } from "react";
import CardSentApplications from "../components/CardSentApplications";
import { getCandidatures } from "../requetes";
import "./styles/ConsultStudentApplies.css";

const ConsultStudentApplies = ({ user }) => {
    const [candidatures, setCandidatures] = useState([]);
    const [noData, setNoData] = useState(false);
    useEffect(() => {
        getCandidatures(setCandidatures, setNoData, user);
    }, []);
    return (
        <div className="consult-container">
            <div className="consult-top">
                <div className="consult-title">Candidatures envoyées</div>
                <div className="consult-student-name">
                    {user.nom}, {user.prenom}
                </div>
                <div className="consult-student-code">{user.code}</div>
            </div>
            <div className="applies">
                {user.candidatures.length} candidatures envoyée(s)
            </div>
            <div className="consult-bottom">
                {candidatures.length === 0 ? (
                    <div>
                        {noData === true
                            ? "Aucune Candidature"
                            : "Chargement en cours..."}
                    </div>
                ) : (
                    <>
                        {candidatures.map((candidature) => (
                            <CardSentApplications candidature={candidature} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default ConsultStudentApplies;
