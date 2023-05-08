import 'graphql';

declare module 'graphql' {
  interface GraphQLErrorExtensions {
    code?: 'TOKEN_EXPIRED' | 'UNAUTHENTICATED' | 'FORBIDDEN';
  }
}
