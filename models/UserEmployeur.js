const mongoose = require("mongoose");

const userEmployeurSchema = new mongoose.Schema(
    {
        code: { type: String },
        nomEntreprise: { type: String },
        nom: { type: String, default: "" },
        prenom: { type: String, default: "" },
        email: { type: String },
        password: { type: String },
        telephone: { type: String, default: "" },
        location: { type: String, default: "" },
        sexe: { type: String, default: "" },
        typeUtilisateur: { type: String, default: "employeur" },
        statut: { type: String, default: "" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("userEmployeur", userEmployeurSchema);
