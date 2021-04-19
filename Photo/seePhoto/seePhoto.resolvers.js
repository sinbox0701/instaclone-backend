import client from "../../client";

export default {
    Query: {
        seePhoto: async (_,args) => {
            const {id} = args;
            return client.photo.findUnique({where:{id}});
        }
    }
}