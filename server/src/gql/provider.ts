import { getUser as getuser } from "../clients/mongo";

export async function getUser() {
    try {
        return await getuser();
    } catch (e: any ) {
        throw new Error;
    }
}