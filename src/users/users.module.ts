import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersMiddleware } from './middleware/users/users.middleware';
import { UsersExtensionMiddleware } from './middleware/users-extension/users-extension.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // OPT - 1
    // consumer.apply(UsersMiddleware).forRoutes('users');

    // OPT - 2
    // consumer.apply(UsersMiddleware).forRoutes(UsersController);

    // OPT - 3
    consumer
      .apply(UsersMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id/:postId',
          method: RequestMethod.GET,
        },
      )
      .apply(UsersExtensionMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users/:id/:postId',
          method: RequestMethod.GET,
        },
      );
  }
}
