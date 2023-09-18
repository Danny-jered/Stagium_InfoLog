const UserAdmin = require("../models//UserAdmin");
const router = require("express").Router();

//obtenir un coordonnateur
router.get("/:id", async (req, res) => {
    try {
        const coordonnateur = await UserAdmin.findById(req.params.id);
        const { password, ...others } = coordonnateur._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});


// mettre à jour un coordonnateur
router.put("/update/:userid", async (req, res) => {
    const infosCoordonnateur = {
        telephone: req.body.telephone,
        location: req.body.location,
    };
    try {
        const updateCoordonnateur = await UserAdmin.updateMany(
            { _id: req.params.userid },
            {
                $set: infosCoordonnateur,
            },
            {new: true}
        );
        return res.status(200).json(updateCoordonnateur);
    } catch (error) {
        return res.status(500).json(error);
    }
});
module.exports = router;
