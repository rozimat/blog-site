const {Router} = require("express");
const {profile} = require("../controllers/profil.controller");
const isAuth = require('../../middleware/is-Auths')

const router = Router();


router.post("/api/profile",isAuth,  profile);




module.exports = router