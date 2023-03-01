import {NextFunction, Request, Response} from 'express';
import HttpException from '../utils/exception/http.exception';
import {verifyToken} from '../utils/token';

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = verifyToken(req.headers.authorization.split(' ')[1]);
        if (!token) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        res.locals.token = token;

        next();
    } else {
        next(new HttpException(401, 'Unauthorized'));
    }


}