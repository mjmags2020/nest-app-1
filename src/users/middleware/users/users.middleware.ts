import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware here');
    const { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('No Auth Token', HttpStatus.FORBIDDEN);

    if (authorization === '123') next();
    else throw new HttpException('Invalid Auth Token', HttpStatus.FORBIDDEN);

    console.log('authorization', req.headers.authorization);
  }
}
