require('dotenv').config();
import express from "express";
import http from "http";
import logger from "morgan";
import {ApolloServer} from "apollo-server-express";
import {typeDefs,resolvers} from "./schema";
import { getUser } from "./User/User.utils";

const PORT = process.env.PORT

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
        if(ctx.req){//http
            return {
                loggedInUser:await getUser(ctx.req.headers.token)
            }
        }else {//web socket
            const {
                connection: { context },
            } = ctx;
            return {
                loggedInUser: context.loggedInUser,
            };
        }
    },
    subscriptions:{//모든 subscription은 private하다는 전제하에
        onConnect: async ({ token }) => {//params, web socket //user 인증
            if (!token) {
              throw new Error("You can't listen.");
            }
            const loggedInUser = await getUser(token);
            return {
              loggedInUser,//return한 loggedInUser는 context로 감
            };
        },
    }
});


const app = express();
//server로 Express를 사용

app.use(logger("tiny"));
//Server의 Resuqet를 볼수있는 Middleware
apollo.applyMiddleware({app});
//apollo server(graphql)은 우리의 express 서버에서 동작
app.use("/static",express.static("uploads"));
//uploads 안의 Files 사용

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});