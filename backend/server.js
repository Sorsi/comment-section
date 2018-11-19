import express from 'express';
import { getSecret } from './secrets';
import Comment from './models/comment';

require('dotenv').config();
const bodyParser = require("body-parser");
const logger = require("morgan")
const mongoose = require("mongoose");
const mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds211774.mlab.com:11774/comment-box-datas`

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;
// db config -- set your URI from mLab in secrets.js
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

router.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments });
  });
});

router.post('/comments', (req, res) => {
  const comment = new Comment();
  const { author, text } = req.body;
  if (!author || !text) {
    return res.json({
      success: false,
      error: 'You must provide an author and comment'
    });
  }
  comment.author = author;
  comment.text = text;
  comment.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
