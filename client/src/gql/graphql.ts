/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  CategoryID: Scalars['Float']['output'];
  color?: Maybe<Scalars['String']['output']>;
  createAt?: Maybe<Scalars['DateTime']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
};

export type CategoryInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type DataInput = {
  date?: InputMaybe<Scalars['Float']['input']>;
  distance?: InputMaybe<Scalars['Float']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  long?: InputMaybe<Scalars['Float']['input']>;
};

export type Event = {
  __typename?: 'Event';
  EventID: Scalars['Float']['output'];
  author?: Maybe<User>;
  category?: Maybe<Scalars['String']['output']>;
  createAt?: Maybe<Scalars['DateTime']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endAt?: Maybe<Scalars['DateTime']['output']>;
  followers?: Maybe<Array<User>>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  locationAddress?: Maybe<Scalars['String']['output']>;
  locationTitle?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Position>;
  price?: Maybe<Scalars['String']['output']>;
  startAt?: Maybe<Scalars['DateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
};

export type EventInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endAt?: InputMaybe<Scalars['DateTime']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  locationAddress?: InputMaybe<Scalars['String']['input']>;
  locationTitle?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<PositionInput>;
  price?: InputMaybe<Scalars['String']['input']>;
  startAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  users?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type FcmToken = {
  __typename?: 'FCMToken';
  FCMToken?: Maybe<Scalars['String']['output']>;
  FCMTokenID: Scalars['Float']['output'];
  user?: Maybe<User>;
};

export type Follow = {
  __typename?: 'Follow';
  FollowID: Scalars['Float']['output'];
  createAt?: Maybe<Scalars['DateTime']['output']>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FollowEventInput = {
  EventID?: InputMaybe<Scalars['Float']['input']>;
  UserID?: InputMaybe<Scalars['Float']['input']>;
};

export type FollowInput = {
  followerId?: InputMaybe<Scalars['Float']['input']>;
  followingId?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createEvent: Event;
  createFCMToken: Scalars['String']['output'];
  editFollow: Scalars['String']['output'];
  editFollowEvent: Scalars['String']['output'];
  editInterests: Scalars['String']['output'];
  editUser: User;
};


export type MutationCreateCategoryArgs = {
  categoryInput: CategoryInput;
};


export type MutationCreateEventArgs = {
  eventinput: EventInput;
};


export type MutationCreateFcmTokenArgs = {
  FCMToken: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationEditFollowArgs = {
  followInput: FollowInput;
  type: Scalars['String']['input'];
};


export type MutationEditFollowEventArgs = {
  followEventInput: FollowEventInput;
  type: Scalars['String']['input'];
};


export type MutationEditInterestsArgs = {
  interests: Array<UserCategoryInput>;
  userId: Scalars['Float']['input'];
};


export type MutationEditUserArgs = {
  userId: Scalars['Float']['input'];
  userInput: UserInput;
};

export type ParamsInput = {
  data?: InputMaybe<DataInput>;
  skip?: InputMaybe<Scalars['Float']['input']>;
  take?: InputMaybe<Scalars['Float']['input']>;
};

export type Position = {
  __typename?: 'Position';
  PositionID: Scalars['Float']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type PositionInput = {
  lat?: InputMaybe<Scalars['Float']['input']>;
  lng?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  events: Array<Event>;
  events_nearby: Array<Event>;
  events_upcoming: Array<Event>;
  fcmtokens: Array<FcmToken>;
  follows: Array<Follow>;
  getUserId: User;
  positions: Array<Position>;
  user: User;
  users: Array<User>;
};


export type QueryEventsArgs = {
  paramsInput: ParamsInput;
};


export type QueryEvents_NearbyArgs = {
  paramsInput: ParamsInput;
};


export type QueryFcmtokensArgs = {
  paramsInput: ParamsInput;
};


export type QueryGetUserIdArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryPositionsArgs = {
  paramsInput: ParamsInput;
};


export type QueryUserArgs = {
  email: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  Email?: Maybe<Scalars['String']['output']>;
  Password?: Maybe<Scalars['String']['output']>;
  PhotoUrl?: Maybe<Scalars['String']['output']>;
  UserID: Scalars['Float']['output'];
  Username?: Maybe<Scalars['String']['output']>;
  fcmTokens: Array<FcmToken>;
  followEvents?: Maybe<Array<Event>>;
  followers: Array<User>;
  followings: Array<User>;
  interests?: Maybe<Array<Category>>;
  isChangePassword?: Maybe<Scalars['Float']['output']>;
};

export type UserCategoryInput = {
  CategoryID?: InputMaybe<Scalars['Float']['input']>;
  UserID?: InputMaybe<Scalars['Float']['input']>;
};

export type UserInput = {
  Email?: InputMaybe<Scalars['String']['input']>;
  Password?: InputMaybe<Scalars['String']['input']>;
  PhotoUrl?: InputMaybe<Scalars['String']['input']>;
  Username?: InputMaybe<Scalars['String']['input']>;
  followEvents?: InputMaybe<Array<EventInput>>;
  isChangePassword?: InputMaybe<Scalars['Float']['input']>;
};

export type CreateCategoryMutationVariables = Exact<{
  categoryInput: CategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', CategoryID: number, createAt?: any | null, updateAt?: any | null, title?: string | null, color?: string | null, label?: string | null } };

export type EditInterestsMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  interests: Array<UserCategoryInput> | UserCategoryInput;
}>;


export type EditInterestsMutation = { __typename?: 'Mutation', editInterests: string };

export type EditUserMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  userInput: UserInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'User', UserID: number, Username?: string | null, Email?: string | null, Password?: string | null, PhotoUrl?: string | null, isChangePassword?: number | null } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', CategoryID: number, createAt?: any | null, updateAt?: any | null, title?: string | null, color?: string | null, label?: string | null }> };

export type GetUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserIdQuery = { __typename?: 'Query', getUserId: { __typename?: 'User', UserID: number, Username?: string | null, Email?: string | null, PhotoUrl?: string | null, followings: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null, Username?: string | null, Email?: string | null }>, followers: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null, Username?: string | null, Email?: string | null }>, interests?: Array<{ __typename?: 'Category', CategoryID: number, title?: string | null, label?: string | null, color?: string | null }> | null } };


export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const EditInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditInterests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interests"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCategoryInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editInterests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"interests"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interests"}}}]}]}}]} as unknown as DocumentNode<EditInterestsMutation, EditInterestsMutationVariables>;
export const EditUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isChangePassword"}}]}}]}}]} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const GetUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"followings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserIdQuery, GetUserIdQueryVariables>;