import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, args, { loggedInUser }) => {
        const { id } = args;
        const exsitPhoto = await client.photo.findUnique({
          where: {
              id,
          },
        });
        if (!exsitPhoto) {
          return {
            ok: false,
            error: "Photo not found",
          };
        }
        const likeWhere = {
          photoId_userId: {
            userId: loggedInUser.id,
            photoId: id,
          },
        };
        const like = await client.like.findUnique({
          where: likeWhere,
        });
        console.log(like);
        if (like) {
          await client.like.delete({
            where: likeWhere,
          });
        } else {
            await client.like.create({
              data: {
                user: {
                  connect: {
                    id: loggedInUser.id,
                  },
                },
                photo: {
                  connect: {
                    id: exsitPhoto.id,
                  },
                },
              },
          });
        }
        return {
          ok: true,
        };
    }),
  },
}
