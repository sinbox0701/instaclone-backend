import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, args, { loggedInUser }) => {
        const { file, caption } = args;
        //file은 잠시동안만 String Type --> Caption에 집중
        let hashtagObj = [];
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          //Regular Expression
          hashtagObj = hashtags.map((hashtag)=>({
            where:{hashtag},
            create:{hashtag}
          }));
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