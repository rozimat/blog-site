require("dotenv/config");
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const router = require('./routes')
const app = express();
const Io = require('./utils/Io')
const Comments = new Io ("./databases/comments.json")


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(process.cwd() + "/uploads"));
app.use(router)

const PORT = process.env.PORT || 2222;



const server = app.listen(PORT, ()=>{
  console.log(PORT);
})

const io = require('socket.io')(server,{
  cors:{
    origin: "*",
  }
});


io.on('connection', (socket)=>{
  socket.on('comment', async (data)=>{
    const comments = await Comments.read();
    const newDatas = comments ? [...comments, data] :[data];
    Comments.write(newDatas);
    
    socket.broadcast.emit('comment', data);
  });
})



