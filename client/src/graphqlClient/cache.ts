import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { AddressModel } from "../models/AddressModel";
import { EventModel } from "../models/EventModel";
import { UserModel } from "../models/UserModel";
import { BillModel } from "../models/BillModel";

export const tokenVar: ReactiveVar<string> = makeVar<string>("");
export const userVar: ReactiveVar<UserModel | undefined> = makeVar<
  UserModel | undefined
>(undefined);
export const followEventsVar: ReactiveVar<EventModel[]> = makeVar<EventModel[]>(
  []
);
export const followersVar: ReactiveVar<UserModel[]> = makeVar<UserModel[]>([]);
export const followingsVar: ReactiveVar<UserModel[]> = makeVar<UserModel[]>([]);
export const billsVar: ReactiveVar<BillModel[]> = makeVar<BillModel[]>([]);
export const currentLocationVar: ReactiveVar<AddressModel | undefined> =
  makeVar<AddressModel | undefined>(undefined);

const cache = new InMemoryCache();
export default cache;
