import jwt from 'jsonwebtoken';

export interface TokenPayload {
    _id: string
    email: string,
}

export interface Token extends TokenPayload {
    exp: number,
    iat: number
}

export function signToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: 5 * 60,
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as Token
}