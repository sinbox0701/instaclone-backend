import client from "../../client";

export default {
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