import bcrypt from "bcrypt";
import client from "../client";

export default {
    Mutation: {
        createAccount: async(_,args) => {
            const {
                firstName,
                lastName,
                username,
                email,
                password
            } = args;
            try{
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            { username },
                            { email }
                        ]
                    }
                });
                if(existingUser){
                    throw new Error("이미 존재하는 사용자입니다.");
                }
                const uglyPassword = await bcrypt.hash(password,10);
                return client.user.create({
                    data:{
                        username,
                        email,
                        lastName,
                        firstName,
                        password:uglyPassword
                    }
                })
            }catch(e){
                return e;
            }
        }
    },
    Query:{
        seeProfile: async (_,args)=>{
            const {username} = args;
            return client.user.findUnique({
                where:{
                    username
                }
            }) 
        }
    }
}