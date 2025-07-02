import { addUser, getUser } from "./provider";

export const resolvers = {
    Query: {
        getUser : () => getUser(),
    },
    Mutation:{
        addUser : (root: any,args: any) => addUser(args),
    }
}