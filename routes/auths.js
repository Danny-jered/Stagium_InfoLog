const router = require("express").Router();
const UserEtudiant = require("../models/UserEtudiant");
const UserEmployeur = require("../models/UserEmployeur");
const UserAgent = require("../models/UserAgent");
const UserAdmin = require("../models/UserAdmin");

//ajout Coordonnateur
router.post("/register-admin", async (req, res) => {
  const newUserAdmin = new UserAdmin({
    code: req.body.code,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    telephone: req.body.telephone,
    location: req.body.location,
    universite: req.body.universite,
    password: req.body.password,
  });

  try {
    const savedUserAdmin = await newUserAdmin.save();
    // 201 successfully header
    res.status(201).json(savedUserAdmin);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ajout Agent
router.post("/register-agent", async (req, res) => {
  const newUserAgent = new UserAgent({
    code: req.body.code,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    telephone: req.body.telephone,
    location: req.body.location,
    universite: req.body.universite,
    password: req.body.password,
  });

  try {
    const savedUserAgent = await newUserAgent.save();
    // 201 successfully header
    res.status(201).json(savedUserAgent);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ajout Agent
router.post("/register-company", async (req, res) => {
  const newUserEmployeur = new UserEmployeur({
    code: req.body.code,
    nomEntreprise: req.body.nomEntreprise,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    telephone: req.body.telephone,
    location: req.body.location,
  });

  try {
    const savedUserEmployeur = await newUserEmployeur.save();
    // 201 successfully header
    res.status(201).json(savedUserEmployeur);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ajout Etudiant
router.post("/register-student", async (req, res) => {
  const newUserEtudiant = new UserEtudiant({
    code: req.body.code,
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    telephone: req.body.telephone,
    location: req.body.location,
    universite: req.body.universite,
  });

  try {
    const savedUserEtudiant = await newUserEtudiant.save();
    // 201 successfully header
    res.status(201).json(savedUserEtudiant);
  } catch (error) {
    res.status(500).json(error);
  }
});

// connexion pour tous
router.post("/login", async (req, res) => {
  const coordonnateur = await UserAdmin.findOne({ code: req.body.code });
  const etudiant = await UserEtudiant.findOne({ code: req.body.code });
  const agent = await UserAgent.findOne({ code: req.body.code });
  const employeur = await UserEmployeur.findOne({ code: req.body.code });
  try {
    if (coordonnateur) {
      /* to return user without password */
      const { password, ...others } = coordonnateur._doc;
      return res.status(200).json(others);
    } else if (etudiant) {
      const { password, ...others } = etudiant._doc;
      return res.status(200).json(others);
    } else if (agent) {
      const { password, ...others } = agent._doc;
      return res.status(200).json(others);
    } else if (employeur) {
      const { password, ...others } = employeur._doc;
      return res.status(200).json(others);
    } else {
      return res.status(401).json("Informations invalides");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
