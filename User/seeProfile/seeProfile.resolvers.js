import client from "../../client";

export default {
    Query:{
        seeProfile: async (_,args)=>{
            const {username} = args;
            return client.user.findUnique({
                where:{
                    username
                },
                include:{
                    followers:true,
                    following:true
                }//data가 많아지면 비효율 --> 다른 방법 사용(pagination)
            }) 
        }
    }
}