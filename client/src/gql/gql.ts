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
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "mutation CreateCategory($categoryInput: CategoryInput!) {\n  createCategory(categoryInput: $categoryInput) {\n    CategoryID\n    createAt\n    updateAt\n    title\n    color\n    label\n  }\n}": types.CreateCategoryDocument,
    "mutation EditFollow($type: String!, $followInput: FollowInput!) {\n  editFollow(type: $type, followInput: $followInput)\n}": types.EditFollowDocument,
    "mutation editFollowEvent($type: String!, $followEventInput: FollowEventInput!) {\n  editFollowEvent(type: $type, followEventInput: $followEventInput)\n}": types.EditFollowEventDocument,
    "mutation EditInterests($userId: Float!, $interests: [UserCategoryInput!]!) {\n  editInterests(userId: $userId, interests: $interests)\n}": types.EditInterestsDocument,
    "mutation EditUser($userId: Float!, $userInput: UserInput!) {\n  editUser(userId: $userId, userInput: $userInput) {\n    UserID\n    Username\n    Email\n    Password\n    PhotoUrl\n    isChangePassword\n  }\n}": types.EditUserDocument,
    "query Categories {\n  categories {\n    CategoryID\n    createAt\n    updateAt\n    title\n    color\n    label\n  }\n}": types.CategoriesDocument,
    "query Events_nearby($paramsInput: ParamsInput!) {\n  events_nearby(paramsInput: $paramsInput) {\n    EventID\n    title\n    description\n    locationTitle\n    locationAddress\n    imageUrl\n    price\n    category\n    date\n    startAt\n    endAt\n    position {\n      lat\n      lng\n    }\n    followers {\n      UserID\n    }\n    users {\n      UserID\n      PhotoUrl\n    }\n    author {\n      UserID\n      Email\n      Username\n      PhotoUrl\n      type\n    }\n  }\n}": types.Events_NearbyDocument,
    "query Events_upcoming {\n  events_upcoming {\n    EventID\n    title\n    description\n    locationTitle\n    locationAddress\n    imageUrl\n    price\n    category\n    date\n    startAt\n    endAt\n    position {\n      lat\n      lng\n    }\n    followers {\n      UserID\n    }\n    users {\n      UserID\n      PhotoUrl\n    }\n    author {\n      UserID\n      Email\n      Username\n      PhotoUrl\n      type\n    }\n  }\n}": types.Events_UpcomingDocument,
    "query getUserId($userId: Float!) {\n  getUserId(userId: $userId) {\n    UserID\n    Username\n    Email\n    PhotoUrl\n    about\n    followings {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    followers {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    interests {\n      CategoryID\n      title\n      label\n      color\n    }\n  }\n}": types.GetUserIdDocument,
    "query user($email: String!) {\n  user(email: $email) {\n    UserID\n    Username\n    Password\n    Email\n    PhotoUrl\n    about\n    followEvents {\n      EventID\n    }\n    fcmTokens {\n      FCMToken\n    }\n    followings {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    followers {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n  }\n}": types.UserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCategory($categoryInput: CategoryInput!) {\n  createCategory(categoryInput: $categoryInput) {\n    CategoryID\n    createAt\n    updateAt\n    title\n    color\n    label\n  }\n}"): (typeof documents)["mutation CreateCategory($categoryInput: CategoryInput!) {\n  createCategory(categoryInput: $categoryInput) {\n    CategoryID\n    createAt\n    updateAt\n    title\n    color\n    label\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation EditFollow($type: String!, $followInput: FollowInput!) {\n  editFollow(type: $type, followInput: $followInput)\n}"): (typeof documents)["mutation EditFollow($type: String!, $followInput: FollowInput!) {\n  editFollow(type: $type, followInput: $followInput)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation editFollowEvent($type: String!, $followEventInput: FollowEventInput!) {\n  editFollowEvent(type: $type, followEventInput: $followEventInput)\n}"): (typeof documents)["mutation editFollowEvent($type: String!, $followEventInput: FollowEventInput!) {\n  editFollowEvent(type: $type, followEventInput: $followEventInput)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation EditInterests($userId: Float!, $interests: [UserCategoryInput!]!) {\n  editInterests(userId: $userId, interests: $interests)\n}"): (typeof documents)["mutation EditInterests($userId: Float!, $interests: [UserCategoryInput!]!) {\n  editInterests(userId: $userId, interests: $interests)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation EditUser($userId: Float!, $userInput: UserInput!) {\n  editUser(userId: $userId, userInput: $userInput) {\n    UserID\n    Username\n    Email\n    Password\n    PhotoUrl\n    isChangePassword\n  }\n}"): (typeof documents)["mutation EditUser($userId: Float!, $userInput: UserInput!) {\n  editUser(userId: $userId, userInput: $userInput) {\n    UserID\n    Username\n    Email\n    Password\n    PhotoUrl\n    isChangePassword\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Categories {\n  categories {\n    CategoryID\n    createAt\n    updateAt\n    title\n    color\n    label\n  }\n}"): (typeof documents)["query Categories {\n  categories {\n    CategoryID\n    createAt\n    updateAt\n    title\n    color\n    label\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Events_nearby($paramsInput: ParamsInput!) {\n  events_nearby(paramsInput: $paramsInput) {\n    EventID\n    title\n    description\n    locationTitle\n    locationAddress\n    imageUrl\n    price\n    category\n    date\n    startAt\n    endAt\n    position {\n      lat\n      lng\n    }\n    followers {\n      UserID\n    }\n    users {\n      UserID\n      PhotoUrl\n    }\n    author {\n      UserID\n      Email\n      Username\n      PhotoUrl\n      type\n    }\n  }\n}"): (typeof documents)["query Events_nearby($paramsInput: ParamsInput!) {\n  events_nearby(paramsInput: $paramsInput) {\n    EventID\n    title\n    description\n    locationTitle\n    locationAddress\n    imageUrl\n    price\n    category\n    date\n    startAt\n    endAt\n    position {\n      lat\n      lng\n    }\n    followers {\n      UserID\n    }\n    users {\n      UserID\n      PhotoUrl\n    }\n    author {\n      UserID\n      Email\n      Username\n      PhotoUrl\n      type\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Events_upcoming {\n  events_upcoming {\n    EventID\n    title\n    description\n    locationTitle\n    locationAddress\n    imageUrl\n    price\n    category\n    date\n    startAt\n    endAt\n    position {\n      lat\n      lng\n    }\n    followers {\n      UserID\n    }\n    users {\n      UserID\n      PhotoUrl\n    }\n    author {\n      UserID\n      Email\n      Username\n      PhotoUrl\n      type\n    }\n  }\n}"): (typeof documents)["query Events_upcoming {\n  events_upcoming {\n    EventID\n    title\n    description\n    locationTitle\n    locationAddress\n    imageUrl\n    price\n    category\n    date\n    startAt\n    endAt\n    position {\n      lat\n      lng\n    }\n    followers {\n      UserID\n    }\n    users {\n      UserID\n      PhotoUrl\n    }\n    author {\n      UserID\n      Email\n      Username\n      PhotoUrl\n      type\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUserId($userId: Float!) {\n  getUserId(userId: $userId) {\n    UserID\n    Username\n    Email\n    PhotoUrl\n    about\n    followings {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    followers {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    interests {\n      CategoryID\n      title\n      label\n      color\n    }\n  }\n}"): (typeof documents)["query getUserId($userId: Float!) {\n  getUserId(userId: $userId) {\n    UserID\n    Username\n    Email\n    PhotoUrl\n    about\n    followings {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    followers {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    interests {\n      CategoryID\n      title\n      label\n      color\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query user($email: String!) {\n  user(email: $email) {\n    UserID\n    Username\n    Password\n    Email\n    PhotoUrl\n    about\n    followEvents {\n      EventID\n    }\n    fcmTokens {\n      FCMToken\n    }\n    followings {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    followers {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n  }\n}"): (typeof documents)["query user($email: String!) {\n  user(email: $email) {\n    UserID\n    Username\n    Password\n    Email\n    PhotoUrl\n    about\n    followEvents {\n      EventID\n    }\n    fcmTokens {\n      FCMToken\n    }\n    followings {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n    followers {\n      UserID\n      PhotoUrl\n      Username\n      Email\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;