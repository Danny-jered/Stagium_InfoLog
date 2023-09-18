import axios from "axios";
const API_URL_DEV = "http://localhost:8000/api/";

export const axiosInstance = axios.create({
  baseURL: API_URL_DEV,
});

export const getLocalStorageItemInfos = (item) => {
  return JSON.parse(window.localStorage.getItem(item));
};

export const setLocalStorageItemInfos = (item, data) => {
  window.localStorage.setItem(item, JSON.stringify(data));
};

/**
 * Obtenir tous les utilisateur
 * @param {*} typeUser : etudiant, agent
 * @param {*} setAllUsers : permet de set la réponse
 * @param {*} setNoData : true si pas de donnée sinon false
 */
export const getAllUsers = async (typeUser, setAllUsers, setNoData) => {
  try {
    const users = await axiosInstance.get(`${typeUser}/`);
    setAllUsers(users.data);
    if (users.data.length === 0) setNoData(true);
  } catch (error) {
    console.log(error);
  }
};
/**
 *  Obtenir les infos d'un utilisateur
 * @param {*} typeUser type d'utilisateur : agent, etudiant, admin, employeur
 * @param {*} id id de l'utilisateur
 * @param {*} setUserInfos fonction pour set le user
 */
export const getUserInfos = async (typeUser, id, setUserInfos) => {
  try {
    const userInfos = await axiosInstance.get(`${typeUser}/${id}`);
    setLocalStorageItemInfos("user", userInfos.data);
    setUserInfos(userInfos.data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Mettre à jour les infos d'un utilisateur
 * @param {*} typeUser type d'utilisateur : agent, étudiant, admin, employeur
 * @param {*} id id de l'utilisateur
 * @param {*} userInfos nouvelles informations de l'utilisateur
 * @param {*} updateFonction fonction
 */
export const updateUserInfos = async (
  typeUser,
  id,
  userInfos,
  updateFonction
) => {
  try {
    await axiosInstance.put(`${typeUser}/update/${id}`, userInfos, {
      headers: {
        "content-type":
          typeUser === "étudiant" ? "multipart/form-data" : "application/json",
      },
    });
    updateFonction(true);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Obtenir toutes les offres
 * @param {*} setOffres
 * @param {*} setNoData
 */
export const getOffres = async (setOffres, setNoData) => {
  const user = getLocalStorageItemInfos("user");
  try {
    let offresData;
    if (user.typeUtilisateur === "employeur") {
      offresData = await axiosInstance.get(`offres/employeur/${user._id}`);
    } else {
      offresData = await axiosInstance.get("offres");
    }
    setOffres(offresData.data);
    setLocalStorageItemInfos("offres", offresData.data);
    if (offresData.data.length === 0) setNoData(true);
  } catch (error) {
    console.log(error);
  }
};

/**
 *Supprimer un item

 * @param {*} item : le type d'item qu'on veut supprimer: offres, etudiant, agent
 * @param {*} id : id de l'item qu'on veut supprimer
 * @param {*} setUpdate : fonction qui permettra de mettre à jour les donnés (doit être déclaré dans le fichier dans lequel la fonction est appelée)
 */
export const deleteItem = async (item, id, setUpdate) => {
  try {
    await axiosInstance.delete(`${item}/delete/${id}`);
    setUpdate(true);
  } catch (error) {
    console.log(error);
  }
};

/**
 *retirer un item

 * @param {*} userID : id de l'item dans lequel on veut retirer
 * @param {*} offerId : id de l'item qu'on veut retirer
 * @param {*} setUpdate : fonction qui permettra de mettre à jour les donnés (doit être déclaré dans le fichier dans lequel la fonction est appelée)
 */
export const removeItem = async (userID, offerId, setUpdate) => {
  try {
    await axiosInstance.put(`remove-offre/${userID}`, offerId);
    setUpdate(true);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Obtenir toutes les candidatures d'un étudiant
 *
 * @param {*} setCandidatures
 * @param {*} setNoData
 * @param {*} user : les données de l'étudiant
 */
export const getCandidatures = async (setCandidatures, setNoData, user) => {
  try {
    const candidaturesData = await axiosInstance.get(`offres`);
    const candidaturesTrouvees = candidaturesData.data.filter((item) =>
      user.candidatures.includes(item._id)
    );
    setCandidatures(candidaturesTrouvees);
    setLocalStorageItemInfos("candidatures", candidaturesTrouvees);
    if (getLocalStorageItemInfos("candidatures").length === 0) {
      setNoData(true);
    }
  } catch (error) {
    console.log(error);
  }
};
