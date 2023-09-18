import LoginPage from "./pages/Login";
import AdminPage from "./pages/Admin";
import EtudiantPage from "./pages/Etudiant";
import EmployeurPage from "./pages/Employeur";
import OffreStages from "./pages/OffresStages";
import AccountDetailsPage from "./pages/AccountDetails.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageAgentPage from "./pages/ManageAgent";
import SingleViewUserPage from "./pages/SingleViewUser";
import AgentPage from "./pages/Agent";
import AddNewUserPage from "./pages/AddNewUser";
import ManageStudentPage from "./pages/ManageStudent";
import ManageIntershipsOfferPage from "./pages/ManageIntershipsOffer";
import SingleViewOfferPage from "./pages/SingleViewOffer";
import PostulerPage from "./pages/Postuler";

import ListeOffrePage from "./employeurs/ListeOffre";
import ListeCandidatsPage from "./employeurs/Candidats";
import DepotOffrePage from "./employeurs/Formulaire";

import CandidaturesPage from "./pages/Candidatures";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* VOUS POUVEZ AJOUTER VOS PAGES ICI ET SPÉCIFIER LE CHEMIN
                        EXEMPLE:
                            Ne pas oublier d'importer NomDeLaPage au début du fichier
                            <Route exact path="/chemin-de-la-page" element={<NomDeLaPage />} />
                    */}
                    <Route exact path="/" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/etudiant" element={<EtudiantPage />} />
                    <Route path="/employeur" element={<EmployeurPage />} />
                    <Route path="/offres-stages" element={<OffreStages />} />
                    <Route
                        path="/account/:username"
                        element={<AccountDetailsPage />}
                    />

                    <Route path="/manage-agent" element={<ManageAgentPage />} />
                    <Route
                        path="/single-view/:username"
                        element={<SingleViewUserPage />}
                    />
                    <Route
                        path="/single-view-offer/:id"
                        element={<SingleViewOfferPage />}
                    />
                    <Route path="/agent" element={<AgentPage />} />
                    <Route path="/add-new-user" element={<AddNewUserPage />} />
                    <Route
                        path="/manage-student"
                        element={<ManageStudentPage />}
                    />
                    <Route
                        path="/manage-offer"
                        element={<ManageIntershipsOfferPage />}
                    />
                    <Route
                        path="/manage-offres-employeur"
                        element={<ListeOffrePage />}
                    />
                    <Route path="/candidats" element={<ListeCandidatsPage />} />
                    <Route path="/add-offer" element={<DepotOffrePage />} />
                    <Route path="/postuler" element={<PostulerPage />} />
                    <Route
                        path="/candidatures/:id"
                        element={<CandidaturesPage />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
