import { v2 as cloudinary } from "cloudinary";

export const imagesUpload = async (files, folder) => {
  console.log("file in imageUpload:>> ", files);
  console.log("folder in imageUpload:>> ", folder);
  if (files !== undefined) {
    try {
      const resultsPromises = files.map(async (file) => {
        const cloudinaryResult = await cloudinary.uploader.upload(file.path, {
          folder: folder,
          colors: true,
        });

        return cloudinaryResult.secure_url;
      });
      console.log("resultPromises :>> ", resultsPromises);

      const arrayOfUrls = await Promise.all(resultsPromises);
      console.log("arrayOfUrls :>> ", arrayOfUrls);
      return arrayOfUrls;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const imageUpload = async (file, folder) => {
  console.log("file, folder in imageUpload:>> ", file, folder);
  if (file !== undefined) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: folder,
        invalidate: true,
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
