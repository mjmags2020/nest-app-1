import { UsersExtensionMiddleware } from './users-extension.middleware';

describe('UsersExtensionMiddleware', () => {
  it('should be defined', () => {
    expect(new UsersExtensionMiddleware()).toBeDefined();
  });
});
