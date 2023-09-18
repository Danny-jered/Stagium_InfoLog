const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const offresSchema = new mongoose.Schema(
    {
        auteurOffre: { type: Schema.Types.ObjectId, ref: "userEmployeur" },
        nomEntreprise: { type: String },
        ville: { type: String, default: "" },
        province: { type: String, default: "" },
        codePostal: { type: String },
        titrePoste: { type: String },
        fonction: { type: String },
        superviseurStage: { type: String, default: "" },
        responsableOffre: { type: String, default: "" },
        salaire: { type: String, default: "" },
        nombrebStagiares: { type: String, default: "" },
        nombreHeureSemaine: { type: String },
        frontend: { type: String },
        backend: { type: String },
        francais: { type: String, default: "" },
        anglais: { type: String, default: "" },
        autreExigences: { type: String, default: "" },
        autreLangue: { type: String, default: "" },
        statutOffre: { type: String, default: "" },
        dateDebut: { type: String, default: "" },
        dateFin: { type: String, default: "" },
        lieuStage: { type: String, default: "" },
        candidats: [
            {
                candidat: { type: Schema.Types.ObjectId, ref: "UserEtudiant" },
                nom: { type: String, require: true },
                prenom: { type: String, require: true },
                cv: { type: String, require: true },
                lettre: { type: String },
                statutEntrevue: { type: String, default: "" },
                statutOffreEmbauche: { type: String, default: "" },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Offres", offresSchema);
