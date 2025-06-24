import { getUser as getuser } from "../clients/mongo";
import { GraphQLError } from 'graphql';

export async function getUser() {
    try {
        console.log(`getUser called....`);
        return await getuser();
    } catch (e: any ) {
        throw new GraphQLError(e.message, {
            extensions: {
                code: 'E_GET_USER_ERROR'
            }
        });
    }
}