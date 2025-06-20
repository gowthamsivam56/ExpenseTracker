import { getUser } from "./provider";

export const resolvers = {
    Query: {
        getUser : () => getUser(),
    }
}