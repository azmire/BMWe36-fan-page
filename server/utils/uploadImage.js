import { v2 as cloudinary } from "cloudinary";

export const imageUpload = async (file, folder) => {
  console.log("file, folder in imageUpload:>> ", file, folder);
  if (file !== undefined) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folder,
        colors: true,
      });
      console.log("result", result);

      const { secure_url, public_id } = result;
      return { secure_url, public_id };
    } catch (e) {
      console.log(e);
      return undefined;
    }
  } else {
    return undefined;
  }
};
