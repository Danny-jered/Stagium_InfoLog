const mongoose = require("mongoose");

const userAdminSchema = new mongoose.Schema(
    {
        code: { type: String },
        nom: { type: String, default: "" },
        prenom: { type: String, default: "" },
        email: { type: String },
        password: { type: String },
        telephone: { type: String, default: "" },
        location: { type: String, default: "Montréal" },
        universite: { type: String, default: "" },
        sexe: { type: String, default: "" },
        typeUtilisateur: { type: String, default: "admin" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserAdmin", userAdminSchema);
