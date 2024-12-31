const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;

  if (authorAccountType == "buyer") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden, only sellers can post" });
  }

  const { title, author, price, image, publicId,tags } = req.body;

  try {
    const post = new Post({ title, author, price, image, publicId, authorId ,tags });
    await post.save();

    await User.findByIdAndUpdate(authorId, {
      $push: { uploads: post._id },
    });

    return res
      .status(201)
      .json({ success: true, message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const getAllPosts = async (req, res) => {

//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);
//   const skip = (page-1) *limit;
//   try {
//     const posts = await Post.find({})
//     .sort({createdAt:-1})
//     .skip(skip)
//     .limit(limit);
//     if (posts.length === 0)
//       return res
//         .status(404)
//         .json({ success: false, message: "No posts found" });

//     return res.status(200).json({ success: true, data: posts });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };



const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 6; // Default limit to 6
  const skip = (page - 1) * limit;

  try {
    // Fetch posts with pagination
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Total count for pagination metadata
    const totalPosts = await Post.countDocuments();

    return res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


// const getMyPosts = async (req, res) => {
//   const authorId = req.id;
//   const authorAccountType = req.accountType;

//   console.log(authorId,authorAccountType);
//   try {
//     if (authorAccountType === "buyer") {
//       const user = await User.findById(authorId);
//       console.log("this is our perfect purchese data",user.purchased);
//       if (!user || !user.purchased.length) {
//         return res.status(404).json({ success: false, message: "No posts found" });
//       }
//       return res.status(200).json({ success: true, data: user.purchased });
//     }
//      else {
//       const { uploads } = await User.findById(authorId).populate("uploads");
//       if (!uploads)
//         return res
//           .status(404)
//           .json({ success: false, message: "No posts found" });
//       return res.status(200).json({ success: true, data: uploads });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };



const getMyPosts = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;

  try {
    if (authorAccountType === "buyer") {
      const user = await User.findById(authorId).populate("purchased");
    
      if (!user || !user.purchased.length) {
        return res.status(404).json({ success: false, message: "No posts found" });
      }
      return res.status(200).json({ success: true, data: user.purchased });
    } else {
      const user = await User.findById(authorId).populate("uploads");
      if (!user || !user.uploads.length) {
        return res.status(404).json({ success: false, message: "No posts found" });
      }
      return res.status(200).json({ success: true, data: user.uploads });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};








const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found " });

    const { authorId } = post;
    await User.findByIdAndUpdate(authorId, {
      $pull: { uploads: id },
    });

    // we will not do this as some of the people had already purchased your asset
    // await Post.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const searchPosts = async (req, res) => {
  const { search } = req.query;
  try {
    const posts = await Post.find({ title: { $regex: search, $options: "i" } });
    if (posts.length == 0)
      return res.status(404).json({ success: false, message: "No post found" });

    return res.status(200).json({ success: false, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addToFavourites = async (req, res) => {
  const { authorId } = req.id;
  const { postId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(authorId, {
      $push: { favourites: postId },
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res
      .status(200)
      .json({ success: true, message: "Post added to favourites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const removeFromFavourites = async (req, res) => {
  const { authorId } = req.id;
  const { postId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(authorId, {
      $pull: { favourites: postId },
    });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res
      .status(200)
      .json({ success: true, message: "Post removed from favourites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getFavourites = async (req, res) => {
  const authorId = req.id;
  try {
    const { favourites } = await User.findById(authorId).populate("favourites");
    if (!favourites)
      return res
        .status(404)
        .json({ success: false, message: "No favourites added" });
    return res.status(200).json({ success: true, data: favourites });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// const getPostByDateRange = async (req,res) => {
//   const authorId = req.id;
//   const authorAccountType = req.accountType;
//   let data;

//   try {
    
//     if(authorAccountType == "buyer"){
//       const {purchased} = await User.findById(authorId).populate("purchased");
//       data = purchased;
//     }else{
//       const {uploads} = await User.findById(authorId).populate("uploads");
//       data = uploads;
//     }

//     if(!data)
//       return res
//       .status(500)
//       .json({success: false, message: "No post found"});
  

//   const now = new Date();
  
//   const startofYear = new Date(now.getFullYear(), 0,1);
//   const startofMonth = new Date(now.getFullYear(),now.getMonth(),1);
//   const startofWeek = new Date(now.setDate(now.getDate()-now.getDay()));

//   const postsThisYear = data.filter(
//     (post) => new Date(post.createdAt) >= startofYear
//   );

//   const postsThisMonth = data.filter(
//     (post) => new Date(post.createdAt) >= startofMonth

//     );

//     const postsThisWeek = data.filter(
//       (post) => new Date(post.createdAt) >= startofWeek
//     );

//     return res.status(200).json({
//       success : true,
//       data:{
//         tillNow : data,
//         thisYear : postsThisYear,
//         thisMonth: postsThisMonth,
//         postThisWeek:postsThisWeek,

//       },
//     })


//   } catch (error) {
//     return res.status(500).json({success:false, message:error.message});
//   }
// }


const getPostByDateRange = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;

  try {
    // Fetch user data based on account type
    const user = await User.findById(authorId).populate(
      authorAccountType === "buyer" ? "purchased" : "uploads"
    );

    const data = authorAccountType === "buyer" ? user.purchased : user.uploads;

    if (!data || data.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No posts found",
        data: { tillNow: [], thisYear: [], thisMonth: [], thisWeek: [] },
      });
    }

    // Filter valid posts with proper dates
    const validData = data.filter(
      (post) => post.createdAt && !isNaN(new Date(post.createdAt))
    );

    // Date calculations (normalized to UTC)
    const now = new Date();

    // Start of the year
    const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));

    // Start of the month
    const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));

    // Start of the week (set to last Sunday, normalized to UTC)
    const startOfWeek = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const dayOfWeek = startOfWeek.getUTCDay(); // Sunday is 0
    startOfWeek.setUTCDate(startOfWeek.getUTCDate() - dayOfWeek);
    startOfWeek.setUTCHours(0, 0, 0, 0);

    // Filter posts by date ranges
    const postsThisYear = validData.filter(
      (post) => new Date(post.createdAt) >= startOfYear
    );
    const postsThisMonth = validData.filter(
      (post) => new Date(post.createdAt) >= startOfMonth
    );
    const postsThisWeek = validData.filter(
      (post) => new Date(post.createdAt) >= startOfWeek
    );

    // Return response
    return res.status(200).json({
      success: true,
      data: {
        tillNow: validData,
        thisYear: postsThisYear,
        thisMonth: postsThisMonth,
        thisWeek: postsThisWeek,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};




module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  searchPosts,
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  getPostByDateRange
};
