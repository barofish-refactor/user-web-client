/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "fragment User on User {\n  id\n  loginId\n}": types.UserFragmentDoc,
    "mutation SignInAdminByEveryone($id: String!, $password: String!) {\n  signInAdminByEveryone(id: $id, password: $password) {\n    accessToken\n    refreshToken\n  }\n}\n\nmutation RenewToken($accessToken: String!, $refreshToken: String!) {\n  renewToken(accessToken: $accessToken, refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n  }\n}": types.SignInAdminByEveryoneDocument,
    "query SelectUsersByAdmin($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $take: Int, $skip: Int, $cursor: UserWhereUniqueInput) {\n  selectUsersByAdmin(\n    where: $where\n    orderBy: $orderBy\n    take: $take\n    skip: $skip\n    cursor: $cursor\n  ) {\n    ...User\n    phone\n    joinedAt\n    userPurchaseLog {\n      id\n      groupPurchaseList {\n        id\n        name\n        description\n        state\n        startAt\n        endAt\n        createdAt\n        isApplied\n        image {\n          original\n        }\n      }\n    }\n  }\n  selectUsersCountByAdmin(where: $where)\n}\n\nquery SelectUserByAdmin($userId: Int!) {\n  selectUserByAdmin(userId: $userId) {\n    ...User\n    phone\n    joinedAt\n    userPurchaseLog {\n      id\n      groupPurchaseList {\n        id\n        name\n        description\n        state\n        startAt\n        endAt\n        createdAt\n        isApplied\n        image {\n          original\n        }\n      }\n    }\n  }\n}": types.SelectUsersByAdminDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment User on User {\n  id\n  loginId\n}"): (typeof documents)["fragment User on User {\n  id\n  loginId\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignInAdminByEveryone($id: String!, $password: String!) {\n  signInAdminByEveryone(id: $id, password: $password) {\n    accessToken\n    refreshToken\n  }\n}\n\nmutation RenewToken($accessToken: String!, $refreshToken: String!) {\n  renewToken(accessToken: $accessToken, refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n  }\n}"): (typeof documents)["mutation SignInAdminByEveryone($id: String!, $password: String!) {\n  signInAdminByEveryone(id: $id, password: $password) {\n    accessToken\n    refreshToken\n  }\n}\n\nmutation RenewToken($accessToken: String!, $refreshToken: String!) {\n  renewToken(accessToken: $accessToken, refreshToken: $refreshToken) {\n    accessToken\n    refreshToken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SelectUsersByAdmin($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $take: Int, $skip: Int, $cursor: UserWhereUniqueInput) {\n  selectUsersByAdmin(\n    where: $where\n    orderBy: $orderBy\n    take: $take\n    skip: $skip\n    cursor: $cursor\n  ) {\n    ...User\n    phone\n    joinedAt\n    userPurchaseLog {\n      id\n      groupPurchaseList {\n        id\n        name\n        description\n        state\n        startAt\n        endAt\n        createdAt\n        isApplied\n        image {\n          original\n        }\n      }\n    }\n  }\n  selectUsersCountByAdmin(where: $where)\n}\n\nquery SelectUserByAdmin($userId: Int!) {\n  selectUserByAdmin(userId: $userId) {\n    ...User\n    phone\n    joinedAt\n    userPurchaseLog {\n      id\n      groupPurchaseList {\n        id\n        name\n        description\n        state\n        startAt\n        endAt\n        createdAt\n        isApplied\n        image {\n          original\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query SelectUsersByAdmin($where: UserWhereInput, $orderBy: [UserOrderByWithRelationInput!], $take: Int, $skip: Int, $cursor: UserWhereUniqueInput) {\n  selectUsersByAdmin(\n    where: $where\n    orderBy: $orderBy\n    take: $take\n    skip: $skip\n    cursor: $cursor\n  ) {\n    ...User\n    phone\n    joinedAt\n    userPurchaseLog {\n      id\n      groupPurchaseList {\n        id\n        name\n        description\n        state\n        startAt\n        endAt\n        createdAt\n        isApplied\n        image {\n          original\n        }\n      }\n    }\n  }\n  selectUsersCountByAdmin(where: $where)\n}\n\nquery SelectUserByAdmin($userId: Int!) {\n  selectUserByAdmin(userId: $userId) {\n    ...User\n    phone\n    joinedAt\n    userPurchaseLog {\n      id\n      groupPurchaseList {\n        id\n        name\n        description\n        state\n        startAt\n        endAt\n        createdAt\n        isApplied\n        image {\n          original\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;