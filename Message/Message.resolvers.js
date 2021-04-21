import client from "../client";

export default {
    Room:{
        users:({id}) => client.room.findUnique({where:{id}}).users(),
        messages: ({id}) => client.message.findMany({
            where:{
                roomId:id
            }
        }),
        unreadTotal:({id},_,{loggedInUser})=>{
            if(!loggedInUser){
                return 0;
            }
            client.message.count({
                where:{
                    read:false,
                    roomId:id,
                    user:{
                        id:{
                            not:loggedInUser.id //로그인한 사용자(me)를 제외한 다른 사용자가 보낸 메세지
                        }
                    }
                },
            })
        },
    }
}