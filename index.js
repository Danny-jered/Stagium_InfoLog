const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authsRoute = require("./routes/auths");
const offresRoute = require("./routes/offres");
const etudiantRoute = require("./routes/users");
const agentRoute = require("./routes/agent");
const employeurRoute = require("./routes/employeur");
const coordonnateurRoute = require("./routes/admin");

/* db connection */

// "mongodb+srv://admin:admin@cluster0.up9dksa.mongodb.net/stagium?retryWrites=true&w=majority",

mongoose
  .connect(
    "mongodb+srv://stagiumWeb:Stagiumpassword@stagiumsitewebcluster.dky80tt.mongodb.net/stagium?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auths", authsRoute);
app.use("/api/offres", offresRoute);
app.use("/api/etudiant", etudiantRoute);
app.use("/api/agent", agentRoute);
app.use("/api/employeur", employeurRoute);
app.use("/api/coordonnateur", coordonnateurRoute);
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});
app.listen(8000, () => {
  console.log("Backend server is running!");
});
