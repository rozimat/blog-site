const Io = require('../utils/Io')
const Like = require('../models/Likes');
const Likes = new Io("./databases/likes.json")
const Dislikes = new Io("./databases/dislikes.json")


const likes = async (req, res) => {

  const likes = await Likes.read();
  const dislikes = await Dislikes.read();

  const user_id = req.user.id;
  const post_id = req.params.id
  
  const findDisLike = dislikes.find((like)=> like.post_id == post_id && like.user_id == user_id);
  const findLike = likes.find((like)=> like.post_id == post_id && like.user_id == user_id);

    if (findDisLike){
      const dataDislike = dislikes.filter((like)=> like.user_id !== user_id || like.post_id !== post_id );
      Dislikes.write(dataDislike);

      const newLike = new Like(post_id, user_id);
      const data = likes.length ? [... likes, newLike] : [newLike];
      Likes.write(data);
      res.status(201).json({ message: 'Undislike olinib like qoshiladi'})
    }
    else if (findLike){
      const datalike = likes.filter((like)=> like.user_id !== user_id || like.post_id !== post_id );
      Likes.write(datalike);
      res.status(201).json({ message: 'UnLike'})
    }
    else{
      const newLike = new Like(post_id, user_id);
      const data = likes.length ? [...likes, newLike] : [newLike];
      Likes.write(data);
      res.status(201).json({ message: 'Like'})
    }
}

const disLikes = async (req, res) =>{
 
  const dislikes = await Dislikes.read();
  const likes = await Likes.read();

  const user_id = req.user.id;
  const post_id = req.params.id

  const findLike = likes.find((like)=> like.post_id == post_id && like.user_id == user_id);
  const findDisLike = dislikes.find((like)=> like.post_id == post_id && like.user_id == user_id);

  if (findLike){
    const datalike = likes.filter((like)=> like.user_id !== user_id || like.post_id !== post_id );
    Likes.write(datalike);
 
    const newDislike = new Like(post_id, user_id);
    const data = dislikes.length ? [ ...dislikes, newDislike] : [newDislike];
    Dislikes.write(data);
    res.status(201).json({ message: 'Undislike olinib like qoshiladi'})
  }
  else if (findDisLike){
    const dataDislike = dislikes.filter((like)=> like.user_id !== user_id || like.post_id !== post_id );
    Dislikes.write(dataDislike);
    res.status(201).json({ message: 'UnDisLike'})
  }
  else{
    const newDislike = new Like(post_id, user_id);
    const data = dislikes.length ? [ ...dislikes, newDislike] : [newDislike];
    Dislikes.write(data);
    res.status(201).json({ message: 'Dislike'})
  }
}

module.exports = {
  likes,
  disLikes,

}




