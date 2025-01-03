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
  createEvent: Event;
  createFCMToken: Scalars['String']['output'];
  editFollow: Scalars['String']['output'];
  editFollowEvent: Scalars['String']['output'];
  editUser: User;
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
  isChangePassword?: Maybe<Scalars['Float']['output']>;
};

export type UserInput = {
  Email?: InputMaybe<Scalars['String']['input']>;
  Password?: InputMaybe<Scalars['String']['input']>;
  PhotoUrl?: InputMaybe<Scalars['String']['input']>;
  Username?: InputMaybe<Scalars['String']['input']>;
  followEvents?: InputMaybe<Array<EventInput>>;
  isChangePassword?: InputMaybe<Scalars['Float']['input']>;
};

export type EditUserMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  userInput: UserInput;
}>;


export type EditUserMutation = { __typename?: 'Mutation', editUser: { __typename?: 'User', UserID: number, Username?: string | null, Email?: string | null, Password?: string | null, PhotoUrl?: string | null, isChangePassword?: number | null } };

export type GetUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserIdQuery = { __typename?: 'Query', getUserId: { __typename?: 'User', UserID: number, Username?: string | null, Email?: string | null, PhotoUrl?: string | null, followings: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null, Username?: string | null, Email?: string | null }>, followers: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null, Username?: string | null, Email?: string | null }> } };


export const EditUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isChangePassword"}}]}}]}}]} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const GetUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"followings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserIdQuery, GetUserIdQueryVariables>;