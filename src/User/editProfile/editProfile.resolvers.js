import bcrypt from "bcrypt";
import client from "../../client";
import {protectedResolver} from "../User.utils"
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(async(_,args,{loggedInUser}) => {
        const {
            firstName,
            lastName,
            username,
            email,
            password:newPassword,
            bio,
            avatar
        } = args;
        let avatarUrl = null;
        if(avatar){
          avatarUrl = await uploadToS3(avatar,loggedInUser.id,"avatars");
        }
        let uglyPassword = null;
        if (newPassword) {
            uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updatedUser = await client.user.update({
            where: {
            id:loggedInUser.id
            },
            data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl })
            },
        });
        if (updatedUser.id) {
            return {
            ok: true,
            };
        } else {
            return {
            ok: false,
            error: "프로필 업데이트 실패.",
        };
      }
    })
  }
};