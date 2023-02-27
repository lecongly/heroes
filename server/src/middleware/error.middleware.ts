import {NextFunction, Request, Response} from 'express';
import HttpException from '../utils/exception/http.exception';

export function notFoundRoute(_req: Request,
                              _res: Response,
                              next: NextFunction): void {
    next(new HttpException(404, "404 Not Found"))
}

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
    });
}

export default errorMiddleware;