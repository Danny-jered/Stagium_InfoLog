const UserEmployeur = require("../models/UserEmployeur");
const router = require("express").Router();

//obtenir un employeur
router.get("/:id", async (req, res) => {
  try {
    const employeur = await UserEmployeur.findById(req.params.id);
    const { password, ...others } = employeur._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//mettre à jour un employeur
router.put("/update/:userid", async (req, res) => {
  const infosEmployeur = {
    telephone: req.body.telephone,
    location: req.body.location,
    nomEntreprise: req.body.nomEntreprise,
  };
  try {
    const updateEmployeur = await UserEmployeur.updateMany(
      { _id: req.params.userid },
      {
        $set: infosEmployeur,
      },
      { new: true }
    );
    return res.status(200).json(updateEmployeur);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
