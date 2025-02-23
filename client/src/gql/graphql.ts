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

export type Bill = {
  __typename?: 'Bill';
  BillID: Scalars['Float']['output'];
  authorEvent?: Maybe<User>;
  createAt?: Maybe<Scalars['DateTime']['output']>;
  eventBuy?: Maybe<Event>;
  price?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  userBuy?: Maybe<User>;
};

export type BillInput = {
  authorEvent?: InputMaybe<Scalars['Float']['input']>;
  createAt?: InputMaybe<Scalars['DateTime']['input']>;
  eventBuy?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  userBuy?: InputMaybe<Scalars['Float']['input']>;
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

export type Conversation = {
  __typename?: 'Conversation';
  ConversationID: Scalars['Float']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  createAt?: Maybe<Scalars['DateTime']['output']>;
  creator?: Maybe<User>;
  deleteAt?: Maybe<Scalars['DateTime']['output']>;
  isGroup?: Maybe<Scalars['Float']['output']>;
  msgLast?: Maybe<Scalars['String']['output']>;
  msgLastSender?: Maybe<User>;
  msgLastTime?: Maybe<Scalars['DateTime']['output']>;
  participants?: Maybe<Array<User>>;
  title?: Maybe<Scalars['String']['output']>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ConversationInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  createAt?: InputMaybe<Scalars['Float']['input']>;
  creatorId?: InputMaybe<Scalars['Float']['input']>;
  deleteAt?: InputMaybe<Scalars['Float']['input']>;
  isGroup?: InputMaybe<Scalars['Float']['input']>;
  msgLast?: InputMaybe<Scalars['String']['input']>;
  msgLastSenderId?: InputMaybe<Scalars['Float']['input']>;
  msgLastTime?: InputMaybe<Scalars['String']['input']>;
  participantIds?: InputMaybe<Array<Scalars['Float']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  updateAt?: InputMaybe<Scalars['Float']['input']>;
};

export type DataInput = {
  date?: InputMaybe<Scalars['DateTime']['input']>;
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

export type EventConditionInput = {
  condition?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<EventFilterInput>;
};

export type EventFilterInput = {
  data?: InputMaybe<DataInput>;
  key?: InputMaybe<Scalars['String']['input']>;
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

export type FilterEventsData = {
  condition?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Float']['input']>;
  position?: InputMaybe<PositionInput>;
  priceRange?: InputMaybe<PriceRangeInput>;
  type?: InputMaybe<Scalars['String']['input']>;
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
  createBill: Bill;
  createCategory: Category;
  createConversation: Conversation;
  createEvent: Event;
  createEventUser: Scalars['String']['output'];
  createFCMToken: Scalars['String']['output'];
  createReview: Review;
  deleteConversation: Conversation;
  editBill: Bill;
  editFollow: Scalars['String']['output'];
  editFollowEvent: Scalars['String']['output'];
  editInterests: Scalars['String']['output'];
  editUser: User;
  filterEventsCondition: Array<Event>;
  pushInviteNotifications: Scalars['String']['output'];
  searchEvent: Array<Event>;
};


export type MutationCreateBillArgs = {
  billInput: BillInput;
};


export type MutationCreateCategoryArgs = {
  categoryInput: CategoryInput;
};


export type MutationCreateConversationArgs = {
  conversationInput: ConversationInput;
};


export type MutationCreateEventArgs = {
  eventinput: EventInput;
};


export type MutationCreateEventUserArgs = {
  eventId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationCreateFcmTokenArgs = {
  FCMToken: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationCreateReviewArgs = {
  reviewInput: ReviewInput;
};


export type MutationDeleteConversationArgs = {
  conversationId: Scalars['Float']['input'];
};


export type MutationEditBillArgs = {
  billId: Scalars['Float']['input'];
  billInput: BillInput;
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


export type MutationFilterEventsConditionArgs = {
  filterEventsData: FilterEventsData;
};


export type MutationPushInviteNotificationsArgs = {
  authorId: Scalars['Float']['input'];
  eventId: Scalars['Float']['input'];
  userIds: Array<Scalars['Float']['input']>;
};


export type MutationSearchEventArgs = {
  keySearch: Scalars['String']['input'];
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

export type PriceRangeInput = {
  highValue?: InputMaybe<Scalars['Float']['input']>;
  lowValue?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  bills: Array<Bill>;
  categories: Array<Category>;
  conversations: Array<Conversation>;
  event: Event;
  events: Array<Event>;
  events_nearby: Array<Event>;
  events_upcoming: Array<Event>;
  fcmtokens: Array<FcmToken>;
  follows: Array<Follow>;
  getBillConditions: Array<Bill>;
  getConversationByCreators: Array<Conversation>;
  getEventConditions: Array<Event>;
  getUserId: User;
  positions: Array<Position>;
  reviews: Array<Review>;
  user: User;
  users: Array<User>;
};


export type QueryEventArgs = {
  eventId: Scalars['Float']['input'];
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


export type QueryGetBillConditionsArgs = {
  condition: Scalars['String']['input'];
};


export type QueryGetConversationByCreatorsArgs = {
  creatorId: Scalars['Float']['input'];
};


export type QueryGetEventConditionsArgs = {
  eventConditionInput: EventConditionInput;
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

export type Review = {
  __typename?: 'Review';
  ReviewID: Scalars['Float']['output'];
  createAt?: Maybe<Scalars['DateTime']['output']>;
  reReviewer?: Maybe<User>;
  reviewer?: Maybe<User>;
  star?: Maybe<Scalars['Float']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ReviewInput = {
  reReviewerId?: InputMaybe<Scalars['Float']['input']>;
  reviewerId?: InputMaybe<Scalars['Float']['input']>;
  star?: InputMaybe<Scalars['Float']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  Email?: Maybe<Scalars['String']['output']>;
  Password?: Maybe<Scalars['String']['output']>;
  PhotoUrl?: Maybe<Scalars['String']['output']>;
  UserID: Scalars['Float']['output'];
  Username?: Maybe<Scalars['String']['output']>;
  about?: Maybe<Scalars['String']['output']>;
  author_events?: Maybe<Array<Event>>;
  bills: Array<Bill>;
  fcmTokens: Array<FcmToken>;
  followEvents?: Maybe<Array<Event>>;
  followers: Array<User>;
  followings: Array<User>;
  interests?: Maybe<Array<Category>>;
  isChangePassword?: Maybe<Scalars['Float']['output']>;
  reReviewers: Array<Review>;
  type?: Maybe<Scalars['String']['output']>;
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

export type CreateBillMutationVariables = Exact<{
  billInput: BillInput;
}>;


export type CreateBillMutation = { __typename?: 'Mutation', createBill: { __typename?: 'Bill', BillID: number, createAt?: any | null, updateAt?: any | null, price?: number | null, status?: string | null, userBuy?: { __typename?: 'User', UserID: number } | null, authorEvent?: { __typename?: 'User', UserID: number } | null, eventBuy?: { __typename?: 'Event', EventID: number } | null } };

export type CreateCategoryMutationVariables = Exact<{
  categoryInput: CategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', CategoryID: number, createAt?: any | null, updateAt?: any | null, title?: string | null, color?: string | null, label?: string | null } };

export type CreateConversationMutationVariables = Exact<{
  conversationInput: ConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', ConversationID: number, avatar?: string | null, title?: string | null, isGroup?: number | null, msgLast?: string | null, msgLastTime?: any | null } };

export type CreateEventMutationVariables = Exact<{
  eventinput: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', EventID: number, title?: string | null, description?: string | null, locationTitle?: string | null, locationAddress?: string | null, imageUrl?: string | null, price?: string | null, category?: string | null } };

export type CreateEventUserMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  eventId: Scalars['Float']['input'];
}>;


export type CreateEventUserMutation = { __typename?: 'Mutation', createEventUser: string };

export type CreateReviewMutationVariables = Exact<{
  reviewInput: ReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', ReviewID: number, star?: number | null, text?: string | null } };

export type DeleteConversationMutationVariables = Exact<{
  conversationId: Scalars['Float']['input'];
}>;


export type DeleteConversationMutation = { __typename?: 'Mutation', deleteConversation: { __typename?: 'Conversation', ConversationID: number } };

export type EditBillMutationVariables = Exact<{
  billId: Scalars['Float']['input'];
  billInput: BillInput;
}>;


export type EditBillMutation = { __typename?: 'Mutation', editBill: { __typename?: 'Bill', BillID: number, createAt?: any | null, updateAt?: any | null, price?: number | null, status?: string | null } };

export type EditFollowMutationVariables = Exact<{
  type: Scalars['String']['input'];
  followInput: FollowInput;
}>;


export type EditFollowMutation = { __typename?: 'Mutation', editFollow: string };

export type EditFollowEventMutationVariables = Exact<{
  type: Scalars['String']['input'];
  followEventInput: FollowEventInput;
}>;


export type EditFollowEventMutation = { __typename?: 'Mutation', editFollowEvent: string };

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

export type FilterEventsConditionMutationVariables = Exact<{
  filterEventsData: FilterEventsData;
}>;


export type FilterEventsConditionMutation = { __typename?: 'Mutation', filterEventsCondition: Array<{ __typename?: 'Event', EventID: number, title?: string | null, description?: string | null, locationTitle?: string | null, locationAddress?: string | null, imageUrl?: string | null, price?: string | null, category?: string | null, date?: any | null, startAt?: any | null, endAt?: any | null, createAt?: any | null, updateAt?: any | null }> };

export type PushInviteNotificationsMutationVariables = Exact<{
  userIds: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
  authorId: Scalars['Float']['input'];
  eventId: Scalars['Float']['input'];
}>;


export type PushInviteNotificationsMutation = { __typename?: 'Mutation', pushInviteNotifications: string };

export type SearchEventMutationVariables = Exact<{
  keySearch: Scalars['String']['input'];
}>;


export type SearchEventMutation = { __typename?: 'Mutation', searchEvent: Array<{ __typename?: 'Event', EventID: number, title?: string | null, description?: string | null, locationTitle?: string | null, locationAddress?: string | null, imageUrl?: string | null, price?: string | null, category?: string | null, date?: any | null, startAt?: any | null, endAt?: any | null, createAt?: any | null, updateAt?: any | null }> };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', CategoryID: number, createAt?: any | null, updateAt?: any | null, title?: string | null, color?: string | null, label?: string | null }> };

export type EventQueryVariables = Exact<{
  eventId: Scalars['Float']['input'];
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'Event', EventID: number, title?: string | null, description?: string | null, locationTitle?: string | null, locationAddress?: string | null, imageUrl?: string | null, price?: string | null, category?: string | null, date?: any | null, startAt?: any | null, endAt?: any | null, position?: { __typename?: 'Position', lat?: number | null, lng?: number | null } | null, followers?: Array<{ __typename?: 'User', UserID: number }> | null, users?: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null }> | null, author?: { __typename?: 'User', UserID: number, Email?: string | null, Username?: string | null, PhotoUrl?: string | null, type?: string | null } | null } };

export type Events_NearbyQueryVariables = Exact<{
  paramsInput: ParamsInput;
}>;


export type Events_NearbyQuery = { __typename?: 'Query', events_nearby: Array<{ __typename?: 'Event', EventID: number, title?: string | null, description?: string | null, locationTitle?: string | null, locationAddress?: string | null, imageUrl?: string | null, price?: string | null, category?: string | null, date?: any | null, startAt?: any | null, endAt?: any | null, position?: { __typename?: 'Position', lat?: number | null, lng?: number | null } | null, followers?: Array<{ __typename?: 'User', UserID: number }> | null, users?: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null }> | null, author?: { __typename?: 'User', UserID: number, Email?: string | null, Username?: string | null, PhotoUrl?: string | null, type?: string | null } | null }> };

export type Events_UpcomingQueryVariables = Exact<{ [key: string]: never; }>;


export type Events_UpcomingQuery = { __typename?: 'Query', events_upcoming: Array<{ __typename?: 'Event', EventID: number, title?: string | null, description?: string | null, locationTitle?: string | null, locationAddress?: string | null, imageUrl?: string | null, price?: string | null, category?: string | null, date?: any | null, startAt?: any | null, endAt?: any | null, position?: { __typename?: 'Position', lat?: number | null, lng?: number | null } | null, followers?: Array<{ __typename?: 'User', UserID: number }> | null, users?: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null }> | null, author?: { __typename?: 'User', UserID: number, Email?: string | null, Username?: string | null, PhotoUrl?: string | null, type?: string | null } | null }> };

export type EventsQueryVariables = Exact<{
  paramsInput: ParamsInput;
}>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', EventID: number, title?: string | null, description?: string | null, locationTitle?: string | null, locationAddress?: string | null, imageUrl?: string | null, price?: string | null, category?: string | null, date?: any | null, startAt?: any | null, endAt?: any | null, position?: { __typename?: 'Position', lat?: number | null, lng?: number | null } | null, followers?: Array<{ __typename?: 'User', UserID: number }> | null, users?: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null }> | null, author?: { __typename?: 'User', UserID: number, Email?: string | null, Username?: string | null, PhotoUrl?: string | null, type?: string | null } | null }> };

export type GetBillConditionsQueryVariables = Exact<{
  condition: Scalars['String']['input'];
}>;


export type GetBillConditionsQuery = { __typename?: 'Query', getBillConditions: Array<{ __typename?: 'Bill', BillID: number, createAt?: any | null, updateAt?: any | null, price?: number | null, status?: string | null, eventBuy?: { __typename?: 'Event', EventID: number, imageUrl?: string | null, title?: string | null, startAt?: any | null, endAt?: any | null } | null }> };

export type GetConversationByCreatorsQueryVariables = Exact<{
  creatorId: Scalars['Float']['input'];
}>;


export type GetConversationByCreatorsQuery = { __typename?: 'Query', getConversationByCreators: Array<{ __typename?: 'Conversation', ConversationID: number, avatar?: string | null, title?: string | null, isGroup?: number | null, msgLast?: string | null, msgLastTime?: any | null, createAt?: any | null, updateAt?: any | null, deleteAt?: any | null }> };

export type GetEventConditionsQueryVariables = Exact<{
  eventConditionInput: EventConditionInput;
}>;


export type GetEventConditionsQuery = { __typename?: 'Query', getEventConditions: Array<{ __typename?: 'Event', EventID: number, title?: string | null, description?: string | null, locationTitle?: string | null, locationAddress?: string | null, imageUrl?: string | null, price?: string | null, category?: string | null, date?: any | null, startAt?: any | null, endAt?: any | null, createAt?: any | null, updateAt?: any | null }> };

export type GetUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserIdQuery = { __typename?: 'Query', getUserId: { __typename?: 'User', UserID: number, Username?: string | null, Email?: string | null, PhotoUrl?: string | null, about?: string | null, author_events?: Array<{ __typename?: 'Event', EventID: number, imageUrl?: string | null, locationAddress?: string | null, title?: string | null, startAt?: any | null, endAt?: any | null }> | null, followings: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null, Username?: string | null, Email?: string | null }>, followers: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null, Username?: string | null, Email?: string | null }>, interests?: Array<{ __typename?: 'Category', CategoryID: number, title?: string | null, label?: string | null, color?: string | null }> | null, bills: Array<{ __typename?: 'Bill', BillID: number, createAt?: any | null, updateAt?: any | null, price?: number | null, status?: string | null, eventBuy?: { __typename?: 'Event', EventID: number, imageUrl?: string | null, title?: string | null, startAt?: any | null, endAt?: any | null } | null }>, reReviewers: Array<{ __typename?: 'Review', ReviewID: number, star?: number | null, text?: string | null, createAt?: any | null, reviewer?: { __typename?: 'User', UserID: number, Username?: string | null, PhotoUrl?: string | null } | null }> } };

export type UserQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', UserID: number, Username?: string | null, Password?: string | null, Email?: string | null, PhotoUrl?: string | null, about?: string | null, followEvents?: Array<{ __typename?: 'Event', EventID: number }> | null, fcmTokens: Array<{ __typename?: 'FCMToken', FCMToken?: string | null }>, followings: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null, Username?: string | null, Email?: string | null }>, followers: Array<{ __typename?: 'User', UserID: number, PhotoUrl?: string | null, Username?: string | null, Email?: string | null }> } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', UserID: number, Username?: string | null, Email?: string | null, Password?: string | null, PhotoUrl?: string | null, about?: string | null, type?: string | null, isChangePassword?: number | null }> };


export const CreateBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BillID"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"userBuy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authorEvent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"eventBuy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}}]}}]}}]}}]} as unknown as DocumentNode<CreateBillMutation, CreateBillMutationVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConversationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ConversationID"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isGroup"}},{"kind":"Field","name":{"kind":"Name","value":"msgLast"}},{"kind":"Field","name":{"kind":"Name","value":"msgLastTime"}}]}}]}}]} as unknown as DocumentNode<CreateConversationMutation, CreateConversationMutationVariables>;
export const CreateEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventinput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventinput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventinput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"locationTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const CreateEventUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEventUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEventUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}]}]}}]} as unknown as DocumentNode<CreateEventUserMutation, CreateEventUserMutationVariables>;
export const CreateReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateReview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ReviewInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createReview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reviewInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ReviewID"}},{"kind":"Field","name":{"kind":"Name","value":"star"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]} as unknown as DocumentNode<CreateReviewMutation, CreateReviewMutationVariables>;
export const DeleteConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ConversationID"}}]}}]}}]} as unknown as DocumentNode<DeleteConversationMutation, DeleteConversationMutationVariables>;
export const EditBillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditBill"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"billInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BillInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editBill"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"billId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billId"}}},{"kind":"Argument","name":{"kind":"Name","value":"billInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"billInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BillID"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<EditBillMutation, EditBillMutationVariables>;
export const EditFollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditFollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editFollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"followInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followInput"}}}]}]}}]} as unknown as DocumentNode<EditFollowMutation, EditFollowMutationVariables>;
export const EditFollowEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editFollowEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followEventInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editFollowEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"followEventInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followEventInput"}}}]}]}}]} as unknown as DocumentNode<EditFollowEventMutation, EditFollowEventMutationVariables>;
export const EditInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditInterests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interests"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCategoryInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editInterests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"interests"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interests"}}}]}]}}]} as unknown as DocumentNode<EditInterestsMutation, EditInterestsMutationVariables>;
export const EditUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EditUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isChangePassword"}}]}}]}}]} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const FilterEventsConditionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FilterEventsCondition"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterEventsData"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterEventsData"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filterEventsCondition"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterEventsData"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterEventsData"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"locationTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}}]}}]}}]} as unknown as DocumentNode<FilterEventsConditionMutation, FilterEventsConditionMutationVariables>;
export const PushInviteNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PushInviteNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pushInviteNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}]}]}}]} as unknown as DocumentNode<PushInviteNotificationsMutation, PushInviteNotificationsMutationVariables>;
export const SearchEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SearchEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keySearch"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keySearch"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keySearch"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"locationTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}}]}}]}}]} as unknown as DocumentNode<SearchEventMutation, SearchEventMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const EventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Event"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"locationTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<EventQuery, EventQueryVariables>;
export const Events_NearbyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Events_nearby"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paramsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ParamsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events_nearby"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paramsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paramsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"locationTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<Events_NearbyQuery, Events_NearbyQueryVariables>;
export const Events_UpcomingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Events_upcoming"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events_upcoming"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"locationTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<Events_UpcomingQuery, Events_UpcomingQueryVariables>;
export const EventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Events"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paramsInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ParamsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"paramsInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paramsInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"locationTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"position"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;
export const GetBillConditionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBillConditions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"condition"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBillConditions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"condition"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BillID"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"eventBuy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetBillConditionsQuery, GetBillConditionsQueryVariables>;
export const GetConversationByCreatorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversationByCreators"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creatorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getConversationByCreators"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"creatorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creatorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ConversationID"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isGroup"}},{"kind":"Field","name":{"kind":"Name","value":"msgLast"}},{"kind":"Field","name":{"kind":"Name","value":"msgLastTime"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"deleteAt"}}]}}]}}]} as unknown as DocumentNode<GetConversationByCreatorsQuery, GetConversationByCreatorsQueryVariables>;
export const GetEventConditionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventConditions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventConditionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventConditionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEventConditions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventConditionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventConditionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"locationTitle"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}}]}}]}}]} as unknown as DocumentNode<GetEventConditionsQuery, GetEventConditionsQueryVariables>;
export const GetUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"author_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"locationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CategoryID"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bills"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"BillID"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"updateAt"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"eventBuy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"reReviewers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ReviewID"}},{"kind":"Field","name":{"kind":"Name","value":"star"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserIdQuery, GetUserIdQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"followEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventID"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fcmTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"FCMToken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UserID"}},{"kind":"Field","name":{"kind":"Name","value":"Username"}},{"kind":"Field","name":{"kind":"Name","value":"Email"}},{"kind":"Field","name":{"kind":"Name","value":"Password"}},{"kind":"Field","name":{"kind":"Name","value":"PhotoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"about"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isChangePassword"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;