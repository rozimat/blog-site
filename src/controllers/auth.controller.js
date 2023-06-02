const { v4 : uuid } = require("uuid");
const Io = require("../utils/Io");
const bcrypt = require("bcrypt");
const Joi = require("joi")
const jwt = require("../../jwt/jwt");
const Users = new Io("./databases/users.json");
const User = require("../models/User");


const register =  async (req, res)=>{
  try {
    const {username, password, phone_number } = req.body;
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.number()
  })
  const {error} = schema.validate({username, password, phone_number});
  if (error) {
    return res.status(400).json({message: "Password or login is invalid!"})
  }
  const id = uuid();
  const users = await Users.read();
  const hashedPassword = await bcrypt.hash( password, 12);
  const findUser = users.find(( user) => user.username === username);
  if (findUser) {
  res.status(403).json({ message: "User already existed!"})
  }
  else{
  const newUser = new User(id, username, hashedPassword, phone_number);
  const data = users.length ? [...users , newUser] : [newUser];
  Users.write(data)
  const token = jwt.sign({ id : newUser.id})
  res.status(201).json({ message: "succsesss", token})
  }
  } catch (error) {
    res.status(500).json({ message: "Internal server error"})
  }

}

const login = async (req, res)=>{
  try {
    const users = await Users.read();
    const { username, password } = req.body;
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
    const {error} = schema.validate({username, password});
    if (error) {
      return res.status(400).json({ message: "Password or login is invalid! "})
    }
    const findUser = users.find(( user) => user.username === username);
    const compPassword = await bcrypt.compare(password, findUser.password);
    if ( ! findUser ) {
      res.status(403).json({ message: "User not found" });
    }
    if(! compPassword){
       res.status(403).json({ message: "Incorrect password or username"})
    }
    else{
      res.cookie("token", jwt.sign({ id : findUser.id}), {maxAge: 80000*20000})
      res.send({ message: 'Cookie have been saved successfully'});
  
    }

  } 
  catch (error) {
    res.status(500).json({ message: "Internal server error"})
  }

}

module.exports = {
  register,
  login
}
