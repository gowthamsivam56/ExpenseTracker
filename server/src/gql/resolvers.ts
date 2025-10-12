import { addTransaction, updateTransaction, deleteTransactionById, getTransaction } from "./provider";

export const resolvers = {
    Query: {
        getTransaction: () => getTransaction(),
    },
    Mutation: {
        addTransaction: (root: any, args: any) => addTransaction(args),
        updateTransaction: (root: any, args: any) => updateTransaction(args),
        deleteTransactionById: (root: any, args: any) => deleteTransactionById(args),
    }
}