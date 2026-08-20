const Post = require("../models/Post");
const Comment = require("../models/Comment");

const postShape = (p, currentId) => ({
  id: p._id,
  content: p.content,
  image: p.image,
  createdAt: p.createdAt,
  author: p.author ? {
    id: p.author._id,
    name: p.author.name,
    username: p.author.username,
    avatar: p.author.avatar,
    isFollowing: Array.isArray(p.author.followers) && p.author.followers.some(id => id.toString() === currentId.toString())
  } : {
    id: "unknown",
    name: "Unknown user",
    username: "unknown",
    avatar: ""
  },
  likesCount: p.likes.length,
  likedByMe: p.likes.some(id => id.toString() === currentId.toString())
});

exports.createPost = async (req, res) => {
  const { content, image } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: "Post content is required." });
  }

  const post = await Post.create({
    author: req.user._id,
    content: content.trim().slice(0, 1000),
    image: image?.trim() || ""
  });

  const populated = await Post.findById(post._id).populate("author", "name username avatar followers");
  res.status(201).json({ success: true, post: postShape(populated, req.user._id) });
};

exports.getFeed = async (req, res) => {
  const posts = await Post.find()
    .populate("author", "name username avatar followers")
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({ success: true, posts: posts.map(p => postShape(p, req.user._id)) });
};

exports.getUserPosts = async (req, res) => {
  const user = await require("../models/User").findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ success: false, message: "User not found." });

  const posts = await Post.find({ author: user._id })
    .populate("author", "name username avatar followers")
    .sort({ createdAt: -1 });

  res.json({ success: true, posts: posts.map(p => postShape(p, req.user._id)) });
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ success: false, message: "Post not found." });

  if (!post.author.equals(req.user._id)) {
    return res.status(403).json({ success: false, message: "You can only delete your own posts." });
  }

  await Promise.all([
    Post.deleteOne({ _id: post._id }),
    Comment.deleteMany({ post: post._id })
  ]);

  res.json({ success: true, message: "Post deleted." });
};

exports.toggleLike = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ success: false, message: "Post not found." });

  const liked = post.likes.some(id => id.equals(req.user._id));

  if (liked) post.likes.pull(req.user._id);
  else post.likes.addToSet(req.user._id);

  await post.save();

  res.json({ success: true, liked: !liked, likesCount: post.likes.length });
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.id })
    .populate("author", "name username avatar followers")
    .sort({ createdAt: 1 });

  res.json({
    success: true,
    comments: comments.map(c => ({
      id: c._id,
      content: c.content,
      createdAt: c.createdAt,
      author: { id: c.author._id, name: c.author.name, username: c.author.username, avatar: c.author.avatar }
    }))
  });
};

exports.addComment = async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: "Comment cannot be empty." });
  }

  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ success: false, message: "Post not found." });

  const comment = await Comment.create({
    post: post._id,
    author: req.user._id,
    content: content.trim().slice(0, 500)
  });

  const populated = await Comment.findById(comment._id).populate("author", "name username avatar followers");

  res.status(201).json({
    success: true,
    comment: {
      id: populated._id,
      content: populated.content,
      createdAt: populated.createdAt,
      author: {
        id: populated.author._id,
        name: populated.author.name,
        username: populated.author.username,
        avatar: populated.author.avatar
      }
    }
  });
};
