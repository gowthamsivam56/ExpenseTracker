import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

export const generateToken = (user: any) => {
    return jwt.sign(
        {
            email: user.email,
            dbName: user.dbName,
        },
        secret,
        { expiresIn: "1d" }
    );
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, secret);
};