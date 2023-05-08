/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: string;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /** string과 똑같습니다(S3상 파일 URI 표기용 스칼라). */
  FileUri: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
};

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['Int'];
  joinedAt?: Maybe<Scalars['DateTime']>;
  loginId?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EnumGroupPurchaseListStateFilter = {
  equals?: InputMaybe<GroupPurchaseListState>;
  in?: InputMaybe<Array<GroupPurchaseListState>>;
  not?: InputMaybe<NestedEnumGroupPurchaseListStateFilter>;
  notIn?: InputMaybe<Array<GroupPurchaseListState>>;
};

export type EnumUserStateNullableFilter = {
  equals?: InputMaybe<UserState>;
  in?: InputMaybe<Array<UserState>>;
  not?: InputMaybe<NestedEnumUserStateNullableFilter>;
  notIn?: InputMaybe<Array<UserState>>;
};

/** newFile 있는 경우 newFile 우선 */
export type FileUpdateInput = {
  existingFile?: InputMaybe<Scalars['FileUri']>;
  newFile?: InputMaybe<Scalars['Upload']>;
};

export type GroupPurchaseList = {
  __typename?: 'GroupPurchaseList';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  endAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  image?: Maybe<Image>;
  imageInternal: Scalars['String'];
  isApplied?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['DateTime']>;
  state: GroupPurchaseListState;
  userPurchaseLog: Array<UserPurchaseLog>;
};


export type GroupPurchaseListUserPurchaseLogArgs = {
  cursor?: InputMaybe<UserPurchaseLogWhereUniqueInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type GroupPurchaseListOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  imageInternal?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  startAt?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  userPurchaseLog?: InputMaybe<UserPurchaseLogOrderByRelationAggregateInput>;
};

export type GroupPurchaseListState =
  | 'ACTIVE'
  | 'INACTIVE';

export type GroupPurchaseListWhereInput = {
  AND?: InputMaybe<Array<GroupPurchaseListWhereInput>>;
  NOT?: InputMaybe<Array<GroupPurchaseListWhereInput>>;
  OR?: InputMaybe<Array<GroupPurchaseListWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  endAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  imageInternal?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  startAt?: InputMaybe<DateTimeNullableFilter>;
  state?: InputMaybe<EnumGroupPurchaseListStateFilter>;
  userPurchaseLog?: InputMaybe<UserPurchaseLogListRelationFilter>;
};

export type GroupPurchaseListWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

/** original 제외하고는 없으면 썸네일 만드는 구조이므로 필요 시에만 필드에 포함해주세요. */
export type Image = {
  __typename?: 'Image';
  /** 원본이미지 크기 기준 - large : 1/2로 썸네일 생성됩니다. */
  large: Scalars['FileUri'];
  /** 원본이미지 크기 기준 - medium : 1/4로 썸네일 생성됩니다. */
  medium: Scalars['FileUri'];
  /** 원본 이미지 */
  original: Scalars['FileUri'];
  /** 원본이미지 크기 기준 - small : 1/6로 썸네일 생성됩니다. */
  small: Scalars['FileUri'];
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type ModifyTypeEnum =
  | 'CREATE'
  | 'DELETE'
  | 'UPDATE';

export type Mutation = {
  __typename?: 'Mutation';
  /** 공동 구매 신청하기 */
  applyGroupPurchaseByUser?: Maybe<Scalars['Boolean']>;
  /** 공동 구매 취소하기 */
  cancelGroupPurchaseByUser?: Maybe<Scalars['Boolean']>;
  /** 공동 구매 상품 등록 */
  createProductByAdmin?: Maybe<Scalars['Boolean']>;
  /** 공동 구매 목록 다중 삭제 */
  deletePurchaseListsByAdmin?: Maybe<Scalars['Boolean']>;
  renewToken?: Maybe<SignInType>;
  /** 비밀번호 초기화 뮤테이션 */
  resetPasswordByAdmin?: Maybe<Scalars['Boolean']>;
  signInAdminByEveryone: SignInType;
  /** 유저 로그인 뮤테이션 */
  signInUserByEveryone?: Maybe<SignInType>;
  /** 회원가입 뮤테이션 */
  signUpUserByEveryone?: Maybe<Scalars['Boolean']>;
  /** 공동 구매 목록 수정 */
  updatePurchaseListByAdmin?: Maybe<Scalars['Boolean']>;
  /** 공동 구매 목록 상태 변경 */
  updatePurchaseStateByAdmin?: Maybe<Scalars['Boolean']>;
  /** 관리자 유저 상태 변경 뮤테이션 */
  updateUserStateByAdmin?: Maybe<Scalars['Boolean']>;
};


export type MutationApplyGroupPurchaseByUserArgs = {
  groupPurchaseId: Scalars['Int'];
};


export type MutationCancelGroupPurchaseByUserArgs = {
  groupPurchaseId: Scalars['Int'];
};


export type MutationCreateProductByAdminArgs = {
  description?: InputMaybe<Scalars['String']>;
  endAt?: InputMaybe<Scalars['DateTime']>;
  productName?: InputMaybe<Scalars['String']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
};


export type MutationDeletePurchaseListsByAdminArgs = {
  purchaseListIds: Array<Scalars['Int']>;
};


export type MutationRenewTokenArgs = {
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};


export type MutationResetPasswordByAdminArgs = {
  userId: Scalars['Int'];
};


export type MutationSignInAdminByEveryoneArgs = {
  id: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInUserByEveryoneArgs = {
  loginId: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};


export type MutationSignUpUserByEveryoneArgs = {
  loginId: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatePurchaseListByAdminArgs = {
  description?: InputMaybe<Scalars['String']>;
  endAt?: InputMaybe<Scalars['DateTime']>;
  groupPurchaseListId: Scalars['Int'];
  productName?: InputMaybe<Scalars['String']>;
  startAt?: InputMaybe<Scalars['DateTime']>;
};


export type MutationUpdatePurchaseStateByAdminArgs = {
  purchaseListId: Array<Scalars['Int']>;
  state?: InputMaybe<GroupPurchaseListState>;
};


export type MutationUpdateUserStateByAdminArgs = {
  state: UserState;
  userIds: Array<Scalars['Int']>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumGroupPurchaseListStateFilter = {
  equals?: InputMaybe<GroupPurchaseListState>;
  in?: InputMaybe<Array<GroupPurchaseListState>>;
  not?: InputMaybe<NestedEnumGroupPurchaseListStateFilter>;
  notIn?: InputMaybe<Array<GroupPurchaseListState>>;
};

export type NestedEnumUserStateNullableFilter = {
  equals?: InputMaybe<UserState>;
  in?: InputMaybe<Array<UserState>>;
  not?: InputMaybe<NestedEnumUserStateNullableFilter>;
  notIn?: InputMaybe<Array<UserState>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** 공동 구매 목록 단일 조회 */
  selectGroupPurchaseListByEveryone?: Maybe<GroupPurchaseList>;
  selectGroupPurchaseListsByEveryone: Array<GroupPurchaseList>;
  selectGroupPurchaseListsCountByEveryone: Scalars['Int'];
  /** 유저 단일 조회 */
  selectUserByAdmin?: Maybe<User>;
  selectUsersByAdmin: Array<User>;
  selectUsersCountByAdmin: Scalars['Int'];
  whoami?: Maybe<Scalars['String']>;
};


export type QuerySelectGroupPurchaseListByEveryoneArgs = {
  groupPurchaseListId: Scalars['Int'];
};


export type QuerySelectGroupPurchaseListsByEveryoneArgs = {
  cursor?: InputMaybe<GroupPurchaseListWhereUniqueInput>;
  orderBy?: InputMaybe<Array<GroupPurchaseListOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GroupPurchaseListWhereInput>;
};


export type QuerySelectGroupPurchaseListsCountByEveryoneArgs = {
  where?: InputMaybe<GroupPurchaseListWhereInput>;
};


export type QuerySelectUserByAdminArgs = {
  userId: Scalars['Int'];
};


export type QuerySelectUsersByAdminArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QuerySelectUsersCountByAdminArgs = {
  where?: InputMaybe<UserWhereInput>;
};

export type SignInType = {
  __typename?: 'SignInType';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type SortOrder =
  | 'asc'
  | 'desc';

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  joinedAt?: Maybe<Scalars['DateTime']>;
  loginId?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  userPurchaseLog: Array<UserPurchaseLog>;
};


export type UserUserPurchaseLogArgs = {
  cursor?: InputMaybe<UserPurchaseLogWhereUniqueInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type UserOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  joinedAt?: InputMaybe<SortOrder>;
  loginId?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  userPurchaseLog?: InputMaybe<UserPurchaseLogOrderByRelationAggregateInput>;
};

export type UserPurchaseLog = {
  __typename?: 'UserPurchaseLog';
  groupPurchaseList: GroupPurchaseList;
  groupPurchaseListId: Scalars['Int'];
  id: Scalars['Int'];
  user: User;
  userId: Scalars['Int'];
};

export type UserPurchaseLogListRelationFilter = {
  every?: InputMaybe<UserPurchaseLogWhereInput>;
  none?: InputMaybe<UserPurchaseLogWhereInput>;
  some?: InputMaybe<UserPurchaseLogWhereInput>;
};

export type UserPurchaseLogOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
  count?: InputMaybe<SortOrder>;
};

export type UserPurchaseLogWhereInput = {
  AND?: InputMaybe<Array<UserPurchaseLogWhereInput>>;
  NOT?: InputMaybe<Array<UserPurchaseLogWhereInput>>;
  OR?: InputMaybe<Array<UserPurchaseLogWhereInput>>;
  groupPurchaseList?: InputMaybe<GroupPurchaseListWhereInput>;
  groupPurchaseListId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  user?: InputMaybe<UserWhereInput>;
  userId?: InputMaybe<IntFilter>;
};

export type UserPurchaseLogWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type UserState =
  | 'ACTIVE'
  | 'BANNED'
  | 'DELETED';

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  id?: InputMaybe<IntFilter>;
  joinedAt?: InputMaybe<DateTimeNullableFilter>;
  loginId?: InputMaybe<StringNullableFilter>;
  password?: InputMaybe<StringNullableFilter>;
  phone?: InputMaybe<StringNullableFilter>;
  state?: InputMaybe<EnumUserStateNullableFilter>;
  userPurchaseLog?: InputMaybe<UserPurchaseLogListRelationFilter>;
};

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
  loginId?: InputMaybe<Scalars['String']>;
};

export type UserFragment = { __typename?: 'User', id: number, loginId?: string | null };

export type SignInAdminByEveryoneMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInAdminByEveryoneMutation = { __typename?: 'Mutation', signInAdminByEveryone: { __typename?: 'SignInType', accessToken: string, refreshToken: string } };

export type RenewTokenMutationVariables = Exact<{
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
}>;


export type RenewTokenMutation = { __typename?: 'Mutation', renewToken?: { __typename?: 'SignInType', accessToken: string, refreshToken: string } | null };

export type SelectUsersByAdminQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<UserWhereUniqueInput>;
}>;


export type SelectUsersByAdminQuery = { __typename?: 'Query', selectUsersCountByAdmin: number, selectUsersByAdmin: Array<{ __typename?: 'User', phone?: string | null, joinedAt?: string | null, id: number, loginId?: string | null, userPurchaseLog: Array<{ __typename?: 'UserPurchaseLog', id: number, groupPurchaseList: { __typename?: 'GroupPurchaseList', id: number, name?: string | null, description?: string | null, state: GroupPurchaseListState, startAt?: string | null, endAt?: string | null, createdAt?: string | null, isApplied?: boolean | null, image?: { __typename?: 'Image', original: string } | null } }> }> };

export type SelectUserByAdminQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type SelectUserByAdminQuery = { __typename?: 'Query', selectUserByAdmin?: { __typename?: 'User', phone?: string | null, joinedAt?: string | null, id: number, loginId?: string | null, userPurchaseLog: Array<{ __typename?: 'UserPurchaseLog', id: number, groupPurchaseList: { __typename?: 'GroupPurchaseList', id: number, name?: string | null, description?: string | null, state: GroupPurchaseListState, startAt?: string | null, endAt?: string | null, createdAt?: string | null, isApplied?: boolean | null, image?: { __typename?: 'Image', original: string } | null } }> } | null };

export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"loginId"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const SignInAdminByEveryoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignInAdminByEveryone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInAdminByEveryone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<SignInAdminByEveryoneMutation, SignInAdminByEveryoneMutationVariables>;
export const RenewTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenewToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"renewToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accessToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<RenewTokenMutation, RenewTokenMutationVariables>;
export const SelectUsersByAdminDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SelectUsersByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserOrderByWithRelationInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectUsersByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"joinedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userPurchaseLog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupPurchaseList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isApplied"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"original"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"selectUsersCountByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}},...UserFragmentDoc.definitions]} as unknown as DocumentNode<SelectUsersByAdminQuery, SelectUsersByAdminQueryVariables>;
export const SelectUserByAdminDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SelectUserByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectUserByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"joinedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userPurchaseLog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupPurchaseList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isApplied"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"original"}}]}}]}}]}}]}}]}},...UserFragmentDoc.definitions]} as unknown as DocumentNode<SelectUserByAdminQuery, SelectUserByAdminQueryVariables>;