import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, args) => {
        const { username, page } = args;
        const check = await client.user.findUnique({where:{username},select:{id:true}});
        if(!check){
            return{
                ok:false,
                error:"사용자가 존재하지 않습니다!"
            }
        }
        const followers = await client.user
            .findUnique({ where: { username } })
            .followers({
                take: 5,
                skip: (page - 1) * 5,
            });
        const totalFollowers = await client.user.count({
            where:{following:{some:username}}
        });
        return {
            ok: true,
            followers,
            totalPages: Math.ceil(totalFollowers/5)
        };
    },
  },
};