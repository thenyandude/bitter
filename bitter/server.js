const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

require('dotenv').config();



// Definerer en Mongoose-modell for brukere
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  

const User = mongoose.model('User', userSchema);

// Kobler til MongoDB-databasen
mongoose.connect('mongodb://10.12.5.42:27017/bitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Koblet til MongoDB');
}).catch(err => {
  console.error('Kunne ikke koble til MongoDB', err);
});



// Sign-up API-endepunkt
app.post('/api/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).send('Brukernavn og passord er påkrevd');
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('Brukernavn er allerede i bruk');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({
        username,
        password: hashedPassword,
      });
  
      await user.save();
      res.status(201).send({ message: 'Bruker opprettet', userId: user._id });
    } catch (error) {
      res.status(500).send('Serverfeil ved opprettelse av bruker');
    }
  });
  


// Innloggings API-endepunkt
app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Sjekk om brukeren eksisterer
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).send({ message: 'Ugyldig brukernavn eller passord' });
      }
  
      // Valider passordet
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Ugyldig brukernavn eller passord' });
      }
  
      res.status(200).send({ message: 'Innlogging vellykket', userId: user._id });
    } catch (error) {
      res.status(500).send({ message: 'Serverfeil under innlogging' });
    }
  });


  const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    content: String,
    created: { type: Date, default: Date.now }
  });
  
  
  const Post = mongoose.model('Post', postSchema);
  
  
  app.post('/api/posts', async (req, res) => {
    try {
      const { userId, title, content } = req.body;
      
      // Optional: Validate if user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      const newPost = new Post({ userId, title, content });
      await newPost.save();
      res.status(201).send({ message: 'Post created', postId: newPost._id });
    } catch (error) {
      res.status(500).send({ message: 'Error creating post' });
    }
  });

  
  app.get('/api/posts', async (req, res) => {
    try {
        const { userId } = req.query;

        let query = {};
        if (userId) {
            query.userId = userId;
        }

        const posts = await Post.find(query).populate('userId', 'username').sort({ created: -1 });
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching posts' });
    }
});


// Backend route to fetch posts by username
app.get('/api/posts/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const posts = await Post.find({ userId: user._id }).sort({ created: -1 }).limit(5);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching posts' });
  }
});


// DELETE route for a post
app.delete('/api/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    // Optional: Add authorization check here to ensure the user owns the post

    const deletedPost = await Post.findOneAndDelete({ _id: postId });
    if (!deletedPost) {
      return res.status(404).send({ message: 'Post not found' });
    }

    res.status(200).send({ message: 'Post deleted', postId: deletedPost._id });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting post' });
  }
});





  
const port = 3001; // eller hvilken som helst annen port du foretrekker
app.listen(port, () => {
  console.log(`Server kjører på port ${port}`);
});
