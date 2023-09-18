import "./styles/CardOffer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faMoneyBill1Wave,
    faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CardOffer = ({ offer }) => {
    const navigate = useNavigate();

    const handleSingleViewOfferButton = () => {
        navigate(`/single-view-offer/${offer._id}`, { state: offer });
    };
    return (
        <div
            className="card-offer-container"
            onClick={handleSingleViewOfferButton}
        >
            <div className="card-offer-top">
                <div className="card-offer-top-left">{offer.titrePoste}</div>
                {/* <div className="card-offer-top-right">
                    <FontAwesomeIcon icon={faFlag} />
                </div> */}
            </div>
            <div className="card-offer-middle">
                <div className="card-offer-middle-top">
                    {offer.nomEntreprise}
                </div>
                <div className="card-offer-middle-bottom">
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        style={{
                            color: "#2557a7",
                            backgroundColor: "transparent",
                        }}
                    />
                    {offer.ville}
                </div>
            </div>
            <div className="card-offer-bottom">
                <div className="card-offer-bottom-top">
                    <FontAwesomeIcon
                        icon={faMoneyBill1Wave}
                        style={{
                            color: "#2557a7",
                            backgroundColor: "transparent",
                        }}
                    />
                    {offer.salaire}/h
                </div>
                <div className="card-offer-bottom-middle">
                    <FontAwesomeIcon
                        icon={faCircleDot}
                        style={{
                            fontSize: "10px",
                            color: "gray",
                            marginTop: "5px",
                            backgroundColor: "transparent",
                        }}
                    />
                    <p
                        style={{
                            fontSize: "15px",
                            color: "gray",
                            backgroundColor: "transparent",
                        }}
                    >
                        {`${offer.frontend}, ${offer.backend}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardOffer;
