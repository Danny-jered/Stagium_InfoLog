const multer = require("multer");
const router = require("express").Router();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

const Offres = require("../models/Offres");

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
          bucketName: "uploads",
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
    bucketName: "uploads",
  });
});

//ajout offres
router.post("/:id", async (req, res) => {
  const newOffre = new Offres({
    auteurOffre: req.params.id,
    nomEntreprise: req.body.nomEntreprise,
    ville: req.body.ville,
    province: req.body.province,
    codePostal: req.body.codePostal,
    titrePoste: req.body.titrePoste,
    fonction: req.body.fonction,
    superviseurStage: req.body.superviseurStage,
    responsableOffre: req.body.responsableOffre,
    salaire: req.body.salaire,
    nombrebStagiares: req.body.nombrebStagiares,
    nombreHeureSemaine: req.body.nombreHeureSemaine,
    frontend: req.body.frontend,
    backend: req.body.backend,
    francais: req.body.francais,
    anglais: req.body.anglais,
    autreExigences: req.body.autreExigences,
    autreLangue: req.body.autreLangue,
    dateDebut: req.body.dateDebut,
    dateFin: req.body.dateFin,
    lieuStage: req.body.lieuStage,
  });
  try {
    const savedOffre = await newOffre.save();

    return res.status(200).json(savedOffre);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get une offre
router.get("/get-offre/:id", async (req, res) => {
  try {
    const offre = await Offres.findById(req.params.id);
    return res.status(200).json(offre);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get toutes les offres
router.get("/", async (req, res) => {
  try {
    const offres = await Offres.find();
    return res.status(200).json(offres);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Get Offres pour un employeur specifique
router.get("/employeur/:employeurID", async (req, res) => {
  try {
    const offres = await Offres.find({
      auteurOffre: req.params.employeurID,
    });
    return res.status(200).json(offres);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ADD candidature
router.put(
  "/add-candidate/:offerid",
  upload.array("fichier", 3),
  async (req, res) => {
    //! TODO À GERER
    let cvData;
    let lettreData;
    if (req.body.cv) {
      cvData = req.body.cv;
      lettreData = req.files[0]?.filename;
    } else {
      cvData = req.files[0].filename;
      lettreData = req.files.length == 2 ? req.files[1].filename : "";
    }
    const candidats = {
      candidat: req.body.candidat,
      nom: req.body.nom,
      prenom: req.body.prenom,
      cv: cvData,
      lettre: lettreData,
    };
    try {
      const updateOffre = await Offres.updateOne(
        { _id: req.params.offerid },
        {
          $push: { candidats: candidats },
        }
      );
      return res.status(200).json(updateOffre);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);
const customfilter = (offres, titrePoste, ville, langue) => {
  return offres.map((offre) => {
    if (
      langue === "francais" &&
      offre.titrePoste
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(titrePoste) &&
      offre.ville
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(ville) &&
      offre.francais
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(langue)
    ) {
      return offre._id;
    } else if (
      langue === "anglais" &&
      offre.titrePoste
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(titrePoste) &&
      offre.ville
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(ville) &&
      offre.anglais
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(langue)
    ) {
      return offre._id;
    } else if (
      langue === "defaut" &&
      offre.titrePoste
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(titrePoste) &&
      offre.ville
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(ville)
    ) {
      return offre._id;
    } else return "";
  });
};

const customfilter2 = (offres, titrePoste, langue) => {
  return offres.map((offre) => {
    if (
      langue === "francais" &&
      offre.titrePoste
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(titrePoste) &&
      offre.francais
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(langue)
    ) {
      return offre._id;
    } else if (
      langue === "anglais" &&
      offre.titrePoste
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(titrePoste) &&
      offre.anglais
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(langue)
    ) {
      return offre._id;
    } else if (
      langue === "defaut" &&
      offre.titrePoste
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(titrePoste)
    ) {
      return offre._id;
    } else return "";
  });
};
// search api
//FETCH  USER by username
router.get("/search", async (req, res) => {
  try {
    const titrePoste = req.query.titrePoste
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const ville = req.query.ville
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const langue = req.query.langue
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const salaire = req.query.salaire;
    const lieuStage = req.query.lieuStage;

    // obtenir toutes les offres
    let offres;
    if (req.query.date === "asc") {
      offres = await Offres.find();
    } else {
      offres = await Offres.find().sort({ createdAt: -1 });
    }
    if (lieuStage !== "lieustage") {
      offres = offres.filter((offre) => {
        return offre.lieuStage === lieuStage;
      });
    }

    if (salaire !== "salaire") {
      offres = offres.filter((offre) => {
        return offre.salaire === salaire;
      });
    }
    let resultats;
    // retourner les offres qui correspondent à la recherche ou qui contiennent des caractères de la recherhce
    if (req.query.ville === "ville") {
      resultats = customfilter2(offres, titrePoste, langue);
    } else resultats = customfilter(offres, titrePoste, ville, langue);

    //retirer les strings vides
    const idOffresValide = resultats.filter((id) => {
      return id.toString() !== "";
    });
    let offresResultats;
    // recupérer enfin les offres
    offresResultats = offres.filter((offre) => {
      return idOffresValide.includes(offre._id);
    });
    return res.status(200).json(offresResultats);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Offres.findByIdAndDelete(req.params.id);
    return res.status(200).json("Offre supprimée avec succès");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//obtenir document pdf
router.get("/download/:filename", (req, res, next) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Fichier non trouvé",
      });
    }

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", "inline");
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  });
});

//REMOVE candidature
router.put("/remove-candidat/:offerid", async (req, res) => {
  try {
    const updatedOffres = await Offres.updateOne(
      { _id: req.params.offerid },
      { $pull: { candidats: { candidat: req.body.userId } } }
    );
    return res.status(200).json(updatedOffres);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//accept candidat en entrevue
router.put("/accept-candidat/entrevue/:offerid", async (req, res) => {
  try {
    const updatedOffres = await Offres.updateOne(
      { _id: req.params.offerid, "candidats.candidat": req.body.userId },
      {
        $set: {
          "candidats.$.statutEntrevue": "accepté",
        },
      }
    );
    return res.status(200).json(updatedOffres);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//refuse candidat en entrevue
router.put("/refuse-candidat/entrevue/:offerid", async (req, res) => {
  try {
    const updatedOffres = await Offres.updateOne(
      { _id: req.params.offerid, "candidats.candidat": req.body.userId },
      {
        $set: {
          "candidats.$.statutEntrevue": "refusé",
        },
      }
    );
    return res.status(200).json(updatedOffres);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//embauche candidat
router.put("/hire-candidat/:offerid", async (req, res) => {
  try {
    const updatedOffres = await Offres.updateOne(
      { _id: req.params.offerid, "candidats.candidat": req.body.userId },
      {
        $set: {
          "candidats.$.statutOffreEmbauche": "embauché",
        },
      }
    );
    return res.status(200).json(updatedOffres);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
