import Post from "../models/postModel.js";
// creating post
export const postCreate = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({
      title,
      content,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log("Error in creating post:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// getting all the post
export const getAllPsot = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        message: "Posts not found",
      });
    }

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("Error in getting all the posts:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// getPost by id

export const getPostbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({
        message: "post not found"
      })
    }
    return res.status(200).json({
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    console.log("get post by id error", error)
    return res.status(500).json({
      message: "Internal err"
    })
  }
}

// update post controller
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.log("Error in updating post:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    console.log("Error in deleting post:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
