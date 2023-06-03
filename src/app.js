require("dotenv/config");
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const router = require('./routes')
const app = express();
const Io = require('./utils/Io')
const Posts = new Io('./databases/posts.json')
const Comments = new Io ("./databases/comments.json")
const { Bot, InlineKeyboard, InputFile } = require("grammy");

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Bot(BOT_TOKEN);

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

bot.command('start', (ctx)=>{
  bot.api.sendMessage(
    -1001963711534,
    "Oxirgi yuklangan postni kanal uchun chiqarishni hohlaysizmi?",
    {
      reply_markup: new InlineKeyboard()
      .text("true").text("false")
    }
  ) 
})

bot.callbackQuery("true", async(ctx)=>{
  const posts = await Posts.read();
  const thispost = posts[posts.length -1];
  await bot.api.sendPhoto(-1001963711534, ('https://picsum.photos/500/500'), {
    caption: thispost.title,
  })
});

bot.start();