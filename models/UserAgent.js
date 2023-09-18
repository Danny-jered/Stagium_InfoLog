const mongoose = require("mongoose");

const userAgentSchema = new mongoose.Schema(
    {
        code: { type: String },
        nom: { type: String, default: "" },
        prenom: { type: String, default: "" },
        email: { type: String },
        password: { type: String },
        telephone: { type: String, default: "" },
        location: { type: String, default: "" },
        universite: { type: String, default: "" },
        sexe: { type: String, default: "" },
        typeUtilisateur: { type: String, default: "agent" },
        statut: { type: String, default: "active" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserAgent", userAgentSchema);
