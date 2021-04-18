import {gql} from "apollo-server";

export default gql`
    type User{
        id: Int!
        firstName:String!
        lastName:String
        username:String!
        email:String!
        bio: String
        avatar: String
        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
        following: [User]
        followers: [User]
        createdAt: String!
        updatedAt: String!
    }
`;