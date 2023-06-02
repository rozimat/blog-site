require("dotenv/config");
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const { Bot } = require('grammy');

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new Bot(BOT_TOKEN);
const app = express();



app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(process.cwd() + "/uploads"));



app.use(router)

const PORT = process.env.PORT || 2222;

bot.start()

app.listen(PORT, ()=>{
  console.log(PORT);
})
