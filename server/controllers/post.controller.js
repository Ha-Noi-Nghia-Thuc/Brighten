import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in createPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      const updatedLikes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );

      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "Like",
      });
      await notification.save();

      const updatedLikes = post.likes;
      res.status(200).json(post.likes);
    }
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in likeUnlikePost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }

    const comment = { user: userId, text };

    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in commentOnPost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Ensure the user is authorized to delete the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    // Delete image from Cloudinary if it exists
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(imgId);
      } catch (cloudinaryError) {
        console.error(
          `Error deleting image on Cloudinary: ${cloudinaryError.message}`
        );
        return res.status(500).json({ error: "Error deleting post image" });
      }
    }

    // Delete the post from the database
    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    // Log the specific error and return a generic error response
    console.error(`Error in deletePost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password -secretAnswer",
      })
      .populate({
        path: "comments.user",
        select: "-password -secretAnswer",
      });

    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(posts);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in likeUnlikePost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLikedPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "user",
        select: "-password -secretAnswer",
      })
      .populate({
        path: "comments.user",
        select: "-password -secretAnswer",
      });

    res.status(200).json(likedPosts);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in likeUnlikePost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const following = user.following;

    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password -secretAnswer",
      })
      .populate({
        path: "comments.user",
        select: "-password -secretAnswer",
      });

    res.status(200).json(feedPosts);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in likeUnlikePost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password -secretAnswer",
      })
      .populate({
        path: "comments.user",
        select: "-password -secretAnswer",
      });

    res.status(200).json(posts);
  } catch (error) {
    // Ghi lại lỗi chi tiết và trả về phản hồi lỗi chung
    console.error(`Error in likeUnlikePost controller: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
