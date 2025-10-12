import { addtransaction, updatetransaction, deletetransactionById, gettransaction } from "../clients/mongo";
import { GraphQLError } from "graphql";

export async function getTransaction() {
    try {
        console.log(`getTransaction called....`);
        const dbName = "expense_tracker";
        return await gettransaction(dbName);
    } catch (e: any) {
        throw new GraphQLError(e.message, {
            extensions: {
                code: "E_GET_TRANSACTION_ERROR",
            },
        });
    }
}

export async function addTransaction(args: any) {
    try {
        const { date, Category, Description, Amount } = args;
        const dbName = "expense_tracker";
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

export async function updateTransaction(args: any) {
    try {
        const { _id, ...update } = args;
        const dbName = "expense_tracker";
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

export async function deleteTransactionById({ _id }: any) {
    try {
        const dbName = "expense_tracker";
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
