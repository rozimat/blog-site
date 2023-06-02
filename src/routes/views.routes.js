const {Router} = require("express");
const { viewCounter } = require("../controllers/views.controller");
const isAuth = require('../../middleware/is-Auths')
const router = Router();

router.get("/api/posts/:id",isAuth,  viewCounter);

module.exports = router