import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query: {
        seeRoom: protectedResolver(async (_,args,{loggedInUser})=> {
            const {id} = args;
            const room = await client.room.findFirst({
                where: {
                    id,
                    users:{
                        some:{
                            id:loggedInUser.id
                        }
                    }
                }
            });
            return room;
        })
    }
}