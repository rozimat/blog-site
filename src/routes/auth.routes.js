const {Router} = require("express");
const {register , login} = require("../controllers/auth.controller");


const router = Router();


router.post("/api/auth/register", register);
router.post("/api/auth/login", login);



module.exports = router