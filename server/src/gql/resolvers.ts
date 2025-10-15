import { addTransaction, updateTransaction, deleteTransactionById, getTransaction, getTransactionByMonth } from "./provider";

export const resolvers = {
    Query: {
        getTransaction: () => getTransaction(),
        getTransactionByMonth: (root: any, args: any) => getTransactionByMonth(args),
    },
    Mutation: {
        addTransaction: (root: any, args: any) => addTransaction(args),
        updateTransaction: (root: any, args: any) => updateTransaction(args),
        deleteTransactionById: (root: any, args: any) => deleteTransactionById(args),
    }
}