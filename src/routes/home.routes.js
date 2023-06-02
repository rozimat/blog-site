const {Router} = require("express");
const { home } = require("../controllers/home.controller");

const router = Router();

router.get("/api/",  home);

module.exports = router