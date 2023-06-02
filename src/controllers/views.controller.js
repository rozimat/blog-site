const Io = require('../utils/Io');
const Posts = new Io ("./databases/posts.json");
const Views = new Io ("./databases/views.json");

const viewCounter = async (req, res)=>{
  const views = await Views.read();
  const posts = await Posts.read();

  const view_id = req.params.id
  const user_id = req.user.id;
  
  const findViewPost = posts.find((view)=> view.post_id == view_id );
  
    if(findViewPost){
      const findUserView = views.find((v)=> v.view_id === view_id && v.user_id === user_id);
      
      if(findUserView){
        res.status(403).json({ message : "this users already view!"})

      }
       else{
        const newView = { view_id, user_id }
        const data = views.length ? [...views, newView ] : [newView];
        Views.write(data);
        res.status(201).json({ message : "View"})
      }
    }
    else{
      res.status(403).json({ message : "User id is not undefined!"})
    }

    findViewPost.viewCountes = views.length;
    Posts.write(posts);
   
}

module.exports ={
  viewCounter,

}






