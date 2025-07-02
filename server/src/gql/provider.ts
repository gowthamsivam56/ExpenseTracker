import { getUser as getuser, addUser as adduser } from "../clients/mongo";
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
};

export async function addUser(info: any ) {
    try{
        console.log(`addUser called.... Info:${JSON.stringify(info)}`);
        const data = await adduser(info.firstName, info.age);
        console.log(`data`,data);
        if(data) {
            return {
                code: "I_ADD_USER_SUCCESS",
                success: true,
                message: "User added successfully"
            }
        }
        else {
            return {
                code: "E_ADD_USER_FAILED",
                success: false,
                message: "Failed to add the user"
            }
        }

    } catch (e:any) {
        throw e.message;
    }
}