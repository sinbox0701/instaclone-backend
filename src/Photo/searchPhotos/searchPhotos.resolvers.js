import client from "../../client";

export default {
    Query: {
        searchPhotos:async(_,args) => {
            const {keyword} = args;
            return client.photo.findMany({
                where:{
                    caption:{
                        startsWith:keyword
                    }
                }
            })
        }
    }
}