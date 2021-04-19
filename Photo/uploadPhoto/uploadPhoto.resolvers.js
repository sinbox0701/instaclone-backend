import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../Photo.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, args, { loggedInUser }) => {
        const { file, caption } = args;
        //file은 잠시동안만 String Type --> Caption에 집중
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }
        return client.photo.create({
          data:{
            file,
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