import bcrypt from "bcrypt";
import client from "../../client";
import {protectedResolver} from "../User.utils"

export default {
  Mutation: {
    editProfile: protectedResolver(async(_,args,{loggedInUser}) => {
        const {
            firstName,
            lastName,
            username,
            email,
            password:newPassword
        } = args;
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
            ...(uglyPassword && { password: uglyPassword }),
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