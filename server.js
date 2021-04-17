require('dotenv').config();
import express from "express";
import logger from "morgan";
import {ApolloServer} from "apollo-server-express";
import {typeDefs,resolvers} from "./schema";
import { getUser } from "./User/User.utils";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        return {
            loggedInUser:await getUser(req.headers.token)
        }
    }
});

const PORT = process.env.PORT

const app = express();
//server로 Express를 사용
app.use(logger("tiny"));
//Server의 Resuqet를 볼수있는 Middleware
server.applyMiddleware({app});
//apollo server(graphql)은 우리의 express 서버에서 동작
app.listen({port:PORT},()=>{
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});