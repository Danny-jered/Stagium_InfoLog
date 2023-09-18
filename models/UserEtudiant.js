const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const userEtudiantSchema = new mongoose.Schema(
    {
        code: { type: String },
        nom: { type: String, default: "" },
        prenom: { type: String, default: "" },
        email: { type: String },
        password: { type: String, default: "0000" },
        telephone: { type: String, default: "" },
        location: { type: String, default: "" },
        universite: { type: String, default: "" },
        sexe: { type: String, default: "" },
        typeUtilisateur: { type: String, default: "étudiant" },
        cv: { type: String },
        lettre: { type: String },
        francais: { type: String },
        anglais: { type: String },
        statut: { type: String, default: "" },
        stages: [
            {
                demarche: { type: Number, default: 1 },
                statut: { type: String, default: "non placé" },
                offre: { type: Schema.Types.ObjectId, ref: "Offres" },
            },
        ],
        candidatures: [{ type: Schema.Types.ObjectId, ref: "Offres" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserEtudiant", userEtudiantSchema);
