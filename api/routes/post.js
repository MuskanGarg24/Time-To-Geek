const router = require('express').Router()
const Post = require('../models/posts')
const User = require('../models/users');

// Create post
router.post('/', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      username:req.body.username
    })
    const post = await newPost.save(function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('New post created successfully!')
      }
    })
  } catch (error) {
    console.log(error)
  }
})

// Get All Posts
router.get('/', async (req, res) => {
  const username = req.query.user
  try {
    let posts
    if (username) {
      posts = await Post.find(username)
    } else {
      posts = await Post.find()
      console.log(posts);
      res.json(posts);
    }
  } catch (error) {
    console.log(error)
  }
});

// Get a specific post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.json(post);
  } catch (err) {
    console.log(err)
  }
});

// Delete Post
router.delete('/', async (req, res) => {
  try {
    Post.deleteMany(function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('All Posts Deleted Successfully!')
      }
    })
  } catch (err) {
    console.log(err)
  }
})

// Delete a specific Post
router.delete('/:id', async (req, res) => {
  try {
   const post = await Post.findById(req.params.id);
   if(post.username===req.body.username){
    try{
      await post.delete();
      console.log("Post deleted")
    }
    catch(err){
      console.log("cannot delete this post")
    }
   }
  } catch (err) {
    console.log(err)
  }
})

// Update a specific post
router.put('/:id', async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(post.username===req.body.username){
      try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
          $set:req.body
        }, {new:true})
        res.json(updatedPost)
      }
      catch(err){
        console.log(err);
      }
    }
  }
  catch(err){
    console.log(err);
  }
});

module.exports = router;
