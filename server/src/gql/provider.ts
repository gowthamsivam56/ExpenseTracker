import { checkUser, signup, createUserDB, addtransaction, updatetransaction, deletetransactionById, gettransaction, gettransactionByMonth, forgotpassword, checkUserById, updatePassword } from "../clients/mongo";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendResetEmail } from "../utils/mailer"


export async function signUp(args: any) {
    try {
        const hashedPassword = await bcrypt.hash(args?.password, 10);
        const dbName = `user_${args.email.replace(/[@.]/g, "_")}`;
        const existingUser = await checkUser(args?.email);
        if (existingUser) {
            return {
                code: "I_SIGNUP_EMAIL_ALREADY_EXISTS",
                success: false,
                message: "Email already exists",
            };
        }
        const user = {
            fullname: args?.fullname,
            email: args?.email,
            password: hashedPassword,
        }
        const data = await signup(dbName, user);
        await createUserDB(dbName);
        console.log(`data`, data);
        if (data) {
            return {
                code: "I_SIGNUP_SUCCESS",
                success: true,
                message: "Signup successfully",
            };
        } else {
            return {
                code: "I_SIGNUP_FAILED",
                success: false,
                message: "Failed to signed up the user",
            };
        }
    } catch (e: any) {
        return {
            code: "I_SIGNUP_ERROR",
            success: false,
            message: e?.message || "Something went wrong",
        };
    }

}

export async function logIn(args: any) {
    try {
        const user = await checkUser(args?.email);
        if (!user) {
            return {
                code: "I_LOGIN_EMAIL_NOT_FOUND",
                success: false,
                message: "Email not found",
            };
        }

        const isMatch = await bcrypt.compare(args?.password, user?.password);
        if (!isMatch) {
            return {
                code: "I_LOGIN_INVALID_PASSWORD",
                success: false,
                message: "Invalid password",
            };
        }

        return {
            code: "I_LOGIN_SUCCESS",
            success: true,
            message: "Login successfully",
            user: {
                fullname: user.fullname,
                email: user.email,
                dbName: user.dbName
            }
        };
    } catch (e: any) {
        return {
            code: "I_LOGIN_ERROR",
            success: false,
            message: e?.message || "Something went wrong",
        };
    }
}

export async function forgotPassword(args: any) {
    try {
        const user = await checkUser(args?.email);
        if (!user) {
            return {
                code: "I_FORGOT_PASSWORD_EMAIL_NOT_FOUND",
                success: false,
                message: "Email not found",
            };
        }
        const resetToken = randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);
        const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

        const data = await forgotpassword(user?.email, hashedToken, resetTokenExpiry);
        if (data.modifiedCount === 1) {
            const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${resetToken}`;
            await sendResetEmail(user?.email, resetLink);
            return {
                code: "I_FORGOT_PASSWORD_SUCCESS",
                success: true,
                message: "Password reset link sent to email",
            }
        } else {
            return {
                code: "I_FORGOT_PASSWORD_FAILED",
                success: false,
                message: "Failed to process request",
            }
        }

    } catch (e: any) {
        return {
            code: "I_FORGOT_PASSWORD_ERROR",
            success: false,
            message: e?.message || "Something went wrong",
        };
    }
}

export async function resetPassword(args: any) {
    try {
        const user = await checkUserById(args?.userId);
        if (!user) {
            return {
                code: "EMAIL_NOT_FOUND",
                success: false,
                message: "Email not found",
            };
        }

        if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
            return {
                code: "TOKEN_EXPIRED",
                success: false,
                message: "Reset link expired",
            };
        }

        const isMatch = await bcrypt.compare(args?.token, user.resetToken);

        if (!isMatch) {
            return {
                code: "INVALID_TOKEN",
                success: false,
                message: "Invalid reset link",
            };
        }

        const hashedPassword = await bcrypt.hash(args?.password, 10);

        await updatePassword(args?.userId, hashedPassword);

        return {
            code: "PASSWORD_RESET_SUCCESS",
            success: true,
            message: "Password reset successful",
        };

    } catch (e: any) {
        return {
            code: "I_RESET_PASSWORD_ERROR",
            success: false,
            message: e?.message || "Something went wrong",
        };
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
