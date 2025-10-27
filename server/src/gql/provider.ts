import { checkUser, signup, createUserDB, addtransaction, updatetransaction, deletetransactionById, gettransaction, gettransactionByMonth } from "../clients/mongo";
import { GraphQLError } from "graphql";


export async function signUp(args: any) {
    try {
        const dbName = `user_${args.email.replace(/[@.]/g, "_")}`;
        const existingUser = await checkUser(args?.email);
        if (existingUser) {
            throw new Error("User already exists with this email");
        }
        const data = await signup(dbName, args);
        await createUserDB(dbName);
        console.log(`data`, data);
        if (data) {
            return {
                code: "I_SIGNUP_SUCCESS",
                success: true,
                message: "User signed up successfully",
            };
        } else {
            return {
                code: "I_SIGNUP_FAILED",
                success: false,
                message: "Failed to signed up the user",
            };
        }
    } catch (e: any) {
        throw e.message;
    }

}

export async function logIn(args: any) {
    try {
        const user = await checkUser(args?.email);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.password != args.password) {
            throw new Error("Invalid password");
        }

        return {
            code: "I_LOGIN_SUCCESS",
            success: true,
            message: "User login successfully",
            user: {
                fullname: user.fullname,
                email: user.email,
                dbName: user.dbName
            }
        };
    } catch (e: any) {
        throw e.message;
    }
}

export async function getTransaction(dbName: string) {
    try {
        console.log(`getTransaction called....`);
        return await gettransaction(dbName);
    } catch (e: any) {
        throw new GraphQLError(e.message, {
            extensions: {
                code: "E_GET_TRANSACTION_ERROR",
            },
        });
    }
}

export async function addTransaction(args: any, dbName: string) {
    try {
        const { date, Category, Description, Amount } = args;
        const data = await addtransaction(dbName, args);
        console.log(`data`, data);
        if (data) {
            return {
                code: "I_ADD_TRANSACTION",
                success: true,
                message: "Transaction added successfully",
            };
        } else {
            return {
                code: "E_ADD_TRANSACTION_FAILED",
                success: false,
                message: "Failed to add the transaction",
            };
        }
    } catch (e: any) {
        throw e.message;
    }
}

export async function updateTransaction(args: any, dbName: string) {
    try {
        const { _id, ...update } = args;
        const data = await updatetransaction(dbName, _id, update);
        console.log(`data`, data);
        if (data) {
            return {
                code: "I_UPDATE_TRANSACTION",
                success: true,
                message: "Transaction updated successfully",
            };
        } else {
            return {
                code: "E_UPDATE_TRANSACTION_FAILED",
                success: false,
                message: "Failed to update the transaction",
            };
        }
    } catch (e: any) {
        throw e.message;
    }
}

export async function deleteTransactionById({ _id }: any, dbName: string) {
    try {
        const data = await deletetransactionById(dbName, _id);
        if (data) {
            return {
                code: "I_DELETE_TRANSACTION",
                success: true,
                message: "Transaction deleted successfully",
            };
        } else {
            return {
                code: "E_DELETE_TRANSACTION_FAILED",
                success: false,
                message: "Failed to delete the transaction",
            };
        }
    } catch (e: any) {
        throw e.message;
    }
}


export async function getTransactionByMonth(args: any, dbName: string) {
    try {
        console.log(`getTransactionByMonth called....`);
        const transactions = await gettransactionByMonth(dbName, args);
        const totalIncome = transactions.filter((f) => f?.transactionType === 'income').reduce((total, data) => Number(data?.amount) + total, 0);
        const totalExpense = transactions.filter((f) => f?.transactionType === 'expense').reduce((total, data) => Number(data?.amount) + total, 0);
        const availableBalance = totalIncome - totalExpense;
        return {
            totalIncome,
            totalExpense,
            availableBalance,
            transactions,
        };
    } catch (e: any) {
        throw new GraphQLError(e.message, {
            extensions: {
                code: "E_GET_TRANSACTION_BY_MONTH_ERROR",
            },
        });
    }
}
