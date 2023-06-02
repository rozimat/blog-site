const {Router} = require("express");
const { posts, postsEdite, postsDelete } = require("../controllers/posts.controller");
const isAuth = require('../../middleware/is-Auths')

const router = Router();


router.post("/api/posts", isAuth,  posts);
router.put("/api/posts/postsedite/:id", isAuth, postsEdite);
router.delete("/api/posts/postsdelete/:id", isAuth, postsDelete);


module.exports = router