import { PostModel } from "../models/postModel.js";
import { UserModel } from "../models/userModel.js";
import { imagesUpload } from "../utils/uploadImage.js";

export const getPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find()
      .populate({
        path: "author",
      })
      .populate({
        path: "comments",
        populate: { path: "author" },
      })
      .populate({
        path: "usersWhoLiked",
      });

    res.status(200).json(allPosts);
  } catch (e) {
    console.log(e);
  }
};

export const addPost = async (req, res) => {
  const { description, productionYear, engineCode, carModel, caption, author } =
    req.body;

  try {
    const attachedFile = req.files != undefined;
    console.log("REUEST:>> ", req.files);
    if (attachedFile) {
      console.log("creating post with card image");
      const uploadedImagesArray = await imagesUpload(req.files, "cardImage");
      console.log("uploadedImagesArray :>> ", uploadedImagesArray);
      //find author and push post id to author posts array
      const post = new PostModel({
        caption: caption,
        description: description,
        productionYear: productionYear,
        engineCode: engineCode,
        cardImage: uploadedImagesArray,
        carModel: carModel,
        author: author,
      });
      const newPost = await post.save();
      res.status(200).json(newPost);

      const { _id } = newPost;
      const postAuthor = await UserModel.findOneAndUpdate(
        { _id: author },
        {
          $push: { posts: _id },
        },
        { new: true }
      ).populate({ path: "posts" });
      res.status(200).json(postAuthor);
    } else {
      console.log("creating post without card image");
      const newPost = new PostModel({
        caption: caption,
        description: description,
        productionYear: productionYear,
        engineCode: engineCode,
        carModel: carModel,
        author: author,
      });
      const result = await newPost.save();
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id).populate({
      path: "comments",
      populate: { path: "author" },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching post by id:", err);
    res.status(500).json({ message: "Error fetching post", err: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { author } = req.body;
  const post = await PostModel.findById({ _id: req.params.id });

  const isLiked = post.usersWhoLiked.includes(author);

  if (!isLiked) {
    console.log("you pressed like");
    console.log("adding id to db");

    const newPost = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { usersWhoLiked: req.body.author },
      },
      {
        new: true,
        upsert: true,
      }
    )
      .populate({
        path: "author",
      })
      .populate({
        path: "usersWhoLiked",
      });
    res.status(200).json(newPost);
  }

  if (isLiked) {
    console.log("you pressed dislike");
    console.log("removing id from db");
    const newPost = await PostModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { usersWhoLiked: req.body.author },
      },
      {
        new: true,
        upsert: true,
      }
    )
      .populate({
        path: "author",
      })
      .populate({
        path: "usersWhoLiked",
      });
    res.status(200).json(newPost);
  }
};

// export const updatePost = async (req, res) => {
//   const liked = await PostModel.findById({ _id: req.params.id });
//   console.log("liked :>> ", liked.liked);

//   try {
//     if (liked.liked == false) {
//       console.log("adding id to array");

//       const post = await PostModel.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $push: { usersWhoLiked: req.body.author },
//           liked: req.body.liked,
//         },
//         {
//           new: true,
//           upsert: true,
//         }
//       ).populate({
//         path: "author",
//       });
//       res.status(200).json(post);
//     } else if (liked.liked == true) {
//       console.log("removing id from array");

//       const post = await PostModel.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $pull: { usersWhoLiked: req.body.author },
//           liked: req.body.liked,
//         },
//         {
//           new: true,
//           upsert: true,
//         }
//       );
//       res.status(200).json(post);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
