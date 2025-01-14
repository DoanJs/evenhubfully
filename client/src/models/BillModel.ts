export interface BillModel {
  BillID: number;
  __typename: string;
  authorEvent: AuthorEvent;
  createAt: string;
  eventBuy: EventBuy;
  price: number;
  status: string;
  updateAt: any;
  userBuy: UserBuy;
}

export interface AuthorEvent {
  UserID: number;
  __typename: string;
}

export interface EventBuy {
  EventID: number;
  imageUrl: string;
  title: string;
  startAt: string;
  endAt: string;
  __typename: string;
}

export interface UserBuy {
  UserID: number;
  __typename: string;
}
