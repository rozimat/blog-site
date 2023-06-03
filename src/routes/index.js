const auth = require('./auth.routes');
const profile = require('./profile.routes');
const posts = require('./posts.routes');
const likesAndDislikes = require('./class.routes');
const home = require('./home.routes');
const viewCounter = require('./views.routes')



module.exports = [ 
  home,
  auth,
  profile,
  posts,
  likesAndDislikes,
  viewCounter,



]