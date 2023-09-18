import "./styles/CardSentApplications.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
const CardSentApplications = ({ candidature }) => {
    return (
        <div className="card-send-container">
            <div className="statut">candidature envoyée</div>
            <div className="card-send-top">
                <div className="card-send-top-left">
                    {candidature.titrePoste}
                </div>
            </div>
            <div className="card-send-middle">
                <div className="card-send-middle-top">
                    {candidature.nomEntreprise}
                </div>
                <div className="card-send-middle-bottom">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{ color: "#2557a7" }}
                    />
                    {candidature.ville}
                </div>
            </div>
        </div>
    );
};

export default CardSentApplications;
