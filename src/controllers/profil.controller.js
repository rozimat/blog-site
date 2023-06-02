const Io = require('../utils/Io');
const Users = new Io("./databases/users.json");



const profile = async(req,res)=> {
  try {
   const users = await Users.read();
   const { id } =  req.user;
   const findUser = users.find((user)=> user.id === id);
   const user ={
    username: findUser.username,
    user_img: 'https://picsum.photos/1000/1000'
   }
   
  } catch (error) {
   res.status(500).json({error: error.message})
  }
}

module.exports = {
  profile
};