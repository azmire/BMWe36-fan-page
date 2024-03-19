import { v2 as cloudinary } from "cloudinary";

export const imageUpload = async (files, folder) => {
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
