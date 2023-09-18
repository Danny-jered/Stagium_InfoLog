const UserAgent = require("../models/UserAgent");
const router = require("express").Router();

//obtenir un agent
router.get("/:id", async (req, res) => {
    try {
        const agent = await UserAgent.findById(req.params.id);
        const { password, ...others } = agent._doc;
        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//obtenir tous les agent
router.get("/", async (req, res) => {
    try {
        const agent = await UserAgent.find();
        return res.status(200).json(agent);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

//supprimer un agent
router.delete("/delete/:id", async (req, res) => {
    try {
        await UserAgent.findByIdAndDelete(req.params.id);
        return res.status(200).json("Agent supprimé avec succès");
    } catch (err) {
        return res.status(500).json(err);
    }
});

router.put("/update/:userid", async (req, res) => {
    let infosAgent;
    if (req.body.nom || req.body.prenom) {
        infosAgent = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            telephone: req.body.telephone,
            location: req.body.location,
        };
    } else {
        infosAgent = {
            telephone: req.body.telephone,
            location: req.body.location,
        };
    }
    try {
        const updateAgent = await UserAgent.updateMany(
            { _id: req.params.userid },
            {
                $set: infosAgent,
            },
            { new: true }
        );
        return res.status(200).json(updateAgent);
    } catch (error) {
        return res.status(500).json(error);
    }
});
module.exports = router;
