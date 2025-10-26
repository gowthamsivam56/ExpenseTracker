import { signUp, logIn, addTransaction, updateTransaction, deleteTransactionById, getTransaction, getTransactionByMonth } from "./provider";

export const resolvers = {
    Query: {
        getTransaction: () => getTransaction(),
        getTransactionByMonth: (root: any, args: any) => getTransactionByMonth(args),
    },
    Mutation: {
        signUp: (root: any, args: any) => signUp(args),
        logIn: (root: any, args: any) => logIn(args),
        addTransaction: (root: any, args: any) => addTransaction(args),
        updateTransaction: (root: any, args: any) => updateTransaction(args),
        deleteTransactionById: (root: any, args: any) => deleteTransactionById(args),
    }
}