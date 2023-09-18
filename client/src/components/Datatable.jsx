import "./styles/Datatable.css";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import ModalPopup from "./Modal/ModalPopup";
import { Bouton } from "../pages/styles/common-styles";
import {
    axiosInstance,
    getLocalStorageItemInfos,
    setLocalStorageItemInfos,
} from "../requetes";

const Datatable = ({ columns, rows, title, fonction }) => {
    const navigate = useNavigate();
    const [onDelete, setOnDelete] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState("");
    const user = getLocalStorageItemInfos("user");

    useEffect(() => {
        const effacerDonnees = async () => {
            try {
                if (user.typeUtilisateur === "agent") {
                    await axiosInstance.delete(
                        `etudiant/delete/${deleteUserId}`
                    );
                    fonction();
                    navigate("/manage-student");
                } else {
                    await axiosInstance.delete(`agent/delete/${deleteUserId}`);
                    fonction();
                    navigate("/manage-agent");
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (deleteUser) {
            effacerDonnees();
        }
    }, [deleteUser]);

    const handleDeleteButton = (id) => {
        setDeleteUserId(id);
        setOnDelete(!onDelete);
    };

    const actionsColums = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cell-action">
                        <Link
                            to={`/single-view/${params.row._id}`}
                            state={{
                                title:
                                    user.typeUtilisateur === "agent"
                                        ? "étudiants"
                                        : "agents",
                            }}
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                className="view-button"
                                onClick={() =>
                                    setLocalStorageItemInfos(
                                        "singleUser",
                                        params.row
                                    )
                                }
                            >
                                Voir
                            </div>
                        </Link>
                        <div
                            className="delete-button"
                            onClick={() => handleDeleteButton(params.row._id)}
                        >
                            Supprimer
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            {onDelete && (
                <ModalPopup
                    setModal={setOnDelete}
                    modalValue={onDelete}
                    setResponse={setDeleteUser}
                />
            )}
            {/* Add new Users section */}
            <Link
                to="/add-new-user"
                state={{ title }}
                style={{ textDecoration: "none", width: "300px" }}
            >
                <Bouton style={{ fontSize: "17px" }}>
                    Ajouter un nouveau{" "}
                    {title === "étudiants" ? "étudiant" : "agent"}
                </Bouton>
            </Link>

            <DataGrid
                style={{
                    boxShadow: "0px 0px 22px 0px #a1a0a0",
                    marginTop: "20px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                }}
                getRowId={(row) => row._id}
                rows={rows}
                columns={columns.concat(actionsColums)}
                pageSize={6}
                rowsPerPageOptions={[6]}
                disableSelectionOnClick
            />
        </div>
    );
};

export default Datatable;
