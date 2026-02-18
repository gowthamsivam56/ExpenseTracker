import { signUp, logIn, addTransaction, updateTransaction, deleteTransactionById, getTransaction, getTransactionByMonth, forgotPassword, resetPassword } from "./provider";

export const resolvers = {
    Query: {
        getTransaction: (root: any, args: any, { info: { dbName } }: any) => getTransaction(dbName),
        getTransactionByMonth: (root: any, args: any, { info: { dbName } }: any) => getTransactionByMonth(args, dbName),
    },
    Mutation: {
        signUp: (root: any, args: any) => signUp(args),
        logIn: (root: any, args: any) => logIn(args),
        forgotPassword: (root: any, args: any) => forgotPassword(args),
        resetPassword: (root: any, args: any) => resetPassword(args),
        addTransaction: (root: any, args: any, { info: { dbName } }: any) => addTransaction(args, dbName),
        updateTransaction: (root: any, args: any, { info: { dbName } }: any) => updateTransaction(args, dbName),
        deleteTransactionById: (root: any, args: any, { info: { dbName } }: any) => deleteTransactionById(args, dbName),
    }
}