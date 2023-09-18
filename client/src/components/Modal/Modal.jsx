import "./Modal.css";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ modalValue, setModal, children }) => {
    return ReactDOM.createPortal(
        <div className="modal-container-staguim">
            <div className="modal-staguim">
                <div className="modal-content-staguim">
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
                    {children}
                </div>
            </div>
        </div>,
        document.querySelector("#modal")
    );
};

export default Modal;
