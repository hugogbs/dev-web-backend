const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const User = require("../../models/User");

const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

// @route   GET api/post/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find()
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(404).json({ nopostfound: "Post not found" }));
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.params.id }).then(user => {
      Post.findById(req.params.id).then(post => {
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        post
          .remove()
          .then(() => res.json({ sucess: true }))
          .catch(err =>
            res.status(404).json({ postnotfound: "No post found" })
          );
      });
    });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.user.avatar,
      user: req.user.id,
      title: req.body.title
    });

    newPost.save().then(post => res.json(post));
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.params.id }).then(user => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }

        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      });
    });
  }
);

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.params.id }).then(user => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "User have not liked this post yet" });
        }

        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      });
    });
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    User.findOne({ user: req.params.id }).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            user: req.params.user,
            avatar: req.params.avatar
          };

          post.comments.unshift(newComment);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(400)
            .json({ commentnotexists: "Comment does not exist" });
        }

        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

module.exports = router;
