import { addTransaction, deleteTransactionById, getTransaction } from "./provider";

export const resolvers = {
    Query: {
        getTransaction : () => getTransaction(),
    },
    Mutation:{
        addTransaction : (root: any,args: any) => addTransaction(args),
        deleteTransactionById : (root: any,args: any) => deleteTransactionById(args),
    }
}