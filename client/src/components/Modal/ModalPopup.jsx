import "./Modal.css";

import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const ModalPopup = ({ modalValue, setModal, setResponse }) => {
    return ReactDOM.createPortal(
        <div className="modal-container-staguim">
            <div className="modal-popup-staguim">
                <div className="modal-content-popup-staguim">
                    <div className="modal-header-staguim">
                        <FontAwesomeIcon
                            style={{
                                backgroundColor: "transparent",
                                padding: "10px",
                                cursor: "pointer",
                            }}
                            color="#2557a7"
                            onClick={() => setModal(!modalValue)}
                            icon={faX}
                        />
                    </div>
                    <div className="modal-popup-title-staguim">
                        Êtes-vous sûr de vouloir effectuer cette action?
                    </div>
                    <div className="modal-popup-buttons-staguim">
                        <div
                            className="modal-popup-yes-staguim"
                            onClick={() => {
                                setModal(!modalValue);
                                setResponse(true);
                            }}
                        >
                            Oui
                        </div>
                        <div
                            className="modal-popup-no-staguim"
                            onClick={() => {
                                setModal(!modalValue);
                            }}
                        >
                            Non
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector("#modal")
    );
};

export default ModalPopup;
