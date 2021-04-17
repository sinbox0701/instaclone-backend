import bcrypt from "bcrypt";
import client from "../../client";
import {protectedResolver} from "../User.utils"
import {createWriteStream} from "fs"

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
          const {filename, createReadStream} = await avatar;
          const newFileName = `${loggedInUser,id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFileName);
          readStream.pipe(writeStream);
          avatarUrl=`http://localhost:4000/static/${newFileName}`;
          //dns 변경
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