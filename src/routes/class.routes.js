const {Router} = require("express");
const { likes, disLikes } = require("../controllers/likes.controller");
const isAuth = require('../../middleware/is-Auths')

const router = Router();



router.post("/api/posts/likes/:id", isAuth, likes);
router.post("/api/posts/dislikes/:id", isAuth, disLikes);


module.exports = router