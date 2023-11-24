const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/posts.js')

const app = express();
const PORT = 4000;

mongoose.connect('mongodb+srv://test:12345@cluster0.r6auqfo.mongodb.net/BigThree')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
