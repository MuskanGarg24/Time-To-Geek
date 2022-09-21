const router = require('express').Router()
const User = require('../models/users')
const Post = require('../models/posts')
const bcrypt = require('bcrypt')

// Update user credentials
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      console.log(req.body, req.params.id)
      const userToBeUpdated = await User.findById(req.params.id)
      const userOldDetails = await User.findById(req.params.id)

      userToBeUpdated.email =
        req.body.email === '' ? userOldDetails.email : req.body.email
      userToBeUpdated.password =
        req.body.password === '' ? userOldDetails.password : req.body.password
      await userToBeUpdated.save()
      console.log('User Updated Successfully!')
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('You can only update your account')
  }
})

// Get user with username
router.get('/:username', async (req, res) => {
  try {
    if (req.body.username === req.params.username) {
      const { password, ...others } = user._doc
      console.log(others)
    } else {
      console.log('No user found!')
    }
  } catch (err) {
    console.log(err)
  }
})


// delete user
router.delete('/:id', async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      const user = await User.findById(req.params.id)
      try {
        await Post.deleteMany({ username: user.username })
        await User.findByIdAndDelete(req.params.id)
        console.log('User has been deleted');
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log('User not found');
    }
  } else {
    console.log('You can only delete your account');
  }
});


module.exports = router;