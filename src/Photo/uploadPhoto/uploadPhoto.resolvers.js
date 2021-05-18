import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../User/User.utils";
import { processHashtags } from "../Photo.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, args, { loggedInUser }) => {
        const { file, caption } = args;
        const fileUrl = await uploadToS3(file,loggedInUser.id,"uploads")
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }
        return client.photo.create({
          data:{
            file:fileUrl,
            caption,
            user:{
              connect:{
                id:loggedInUser.id
              }
            },
            ...(hashtagObj.length > 0 && {hashtags:{connectOrCreate:hashtagObj}})
          }
        })
      }
    ),
  },
};