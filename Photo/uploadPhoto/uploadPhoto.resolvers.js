import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, args, { loggedInUser }) => {
        const { file, caption } = args;
        //file은 잠시동안만 String Type --> Caption에 집중
        if (caption) {
          /// parse caption
          // get or create Hashtags
        }
        // save the photo WITH the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};