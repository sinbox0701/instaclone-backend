import client from "../../client";

export default {
    Query: {
        searchUsers: async (_, args) =>{
            const { keyword } = args;
            return client.user.findMany({
                where: {
                    username: {
                        startsWith: keyword.toLowerCase(),
                    },
                },
            })
        }
    }
};