const UserEtudiant = require("../models/UserEtudiant");
const multer = require("multer");
const router = require("express").Router();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

const storage = new GridFsStorage({
  url: "mongodb+srv://stagiumWeb:Stagiumpassword@stagiumsitewebcluster.dky80tt.mongodb.net/stagium?retryWrites=true&w=majority",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "etudiantDocuments",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });
const connect = mongoose.createConnection(
  "mongodb+srv://stagiumWeb:Stagiumpassword@stagiumsitewebcluster.dky80tt.mongodb.net/stagium?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let gfs;

connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "etudiantDocuments",
  });
});

//ajouter candidature
router.put("/add-offer/:etudiantid", async (req, res) => {
  try {
    const updateEtudiant = await UserEtudiant.updateOne(
      { _id: req.params.etudiantid },
      {
        $push: { candidatures: req.body.id },
      }
    );
    return res.status(200).json(updateEtudiant);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//obtenir un étudiant
router.get("/:id", async (req, res) => {
  try {
    const user = await UserEtudiant.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//obtenir tous les étudiants
router.get("/", async (req, res) => {
  try {
    const etudiant = await UserEtudiant.find();
    return res.status(200).json(etudiant);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//retirer offres
router.put("/remove-offre/:userid", async (req, res) => {
  try {
    const updatedEtudiant = await UserEtudiant.updateOne(
      { _id: req.params.userid },
      { $pull: { candidatures: req.body.offerId } }
    );
    return res.status(200).json(updatedEtudiant);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//supprimer un étudiant
router.delete("/delete/:id", async (req, res) => {
  try {
    await UserEtudiant.findByIdAndDelete(req.params.id);
    return res.status(200).json("Étudiant supprimé avec succès");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put("/update/:userid", upload.array("fichier", 3), async (req, res) => {
  let infosEtudiant;
  if (req.body.nom || req.body.prenom) {
    infosEtudiant = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      telephone: req.body.telephone,
      location: req.body.location,
    };
  } else {
    infosEtudiant = {
      telephone: req.body.telephone,
      location: req.body.location,
      francais: req.body.francais,
      anglais: req.body.anglais,
      cv: req.files[0]?.filename,
      lettre: req.files.length == 2 ? req.files[1].filename : "",
    };
  }

  try {
    const updateEtudiant = await UserEtudiant.updateMany(
      { _id: req.params.userid },
      {
        $set: infosEtudiant,
      },
      { new: true }
    );
    return res.status(200).json(updateEtudiant);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
