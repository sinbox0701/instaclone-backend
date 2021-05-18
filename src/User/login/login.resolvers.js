import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        login: async(_,args) => {
            const {username, password} = args;
            const user = await client.user.findFirst({where:{username}});
            if(!user){
                return{
                    ok:false,
                    error:"존재하지 않는 사용자입니다!"
                }
            }
            const passwordOk = await bcrypt.compare(password,user.password);
            if(!passwordOk){
                return{
                    ok:false,
                    error:"비밀번호가 틀렸습니다!"
                }
            }
            const token = await jwt.sign({id:user.id},process.env.SECRET_KEY);
            return{
                ok:true,
                token
            }
        }
    }
}