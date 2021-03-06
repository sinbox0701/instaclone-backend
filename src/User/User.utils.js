import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver = (ourResolver) => (
    root,
    args,
    context,
    info
  ) => {
    if (!context.loggedInUser) {//quert의 return 값은 ok,error로 확신할 수 X --> 따라서 구분 필요
      const query = info.operation.operation === "query";
      if(query){
        return null;
      }
      else{
        return {
          ok: false,
          error: "로그인을 먼저 해주세요!",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };